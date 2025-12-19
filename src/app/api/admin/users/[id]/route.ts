import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, cards, transactions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";

// 1. Update the type definition to Promise
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // 2. Await the params
        const { id } = await params;

        const user = await db.query.users.findFirst({
            where: eq(users.id, id),
            columns: { passwordHash: false },
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const userCards = await db.query.cards.findMany({
            where: eq(cards.userId, id),
        });

        const userTransactions = await db.select({
            id: transactions.id,
            description: transactions.description,
            transactionIdDisplay: transactions.transactionIdDisplay,
            type: transactions.type,
            date: transactions.date,
            amount: transactions.amount,
            cardLastFour: cards.lastFourDigits,
            status: transactions.status
        })
            .from(transactions)
            .innerJoin(cards, eq(transactions.cardId, cards.id))
            .where(eq(cards.userId, id))
            .orderBy(desc(transactions.date));

        return NextResponse.json({ user, cards: userCards, transactions: userTransactions });

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();

        // 1. Destructure to strip out fields we SHOULD NOT update directly
        const {
            id: _id,            // Don't update Primary Key
            createdAt,          // Don't update Timestamps manually
            updatedAt,
            password,           // handled separately
            passwordHash,       // don't blindly copy old hash
            dateOfBirth,        // needs cleaning
            ...updatableFields
        } = body;

        let finalUpdate: any = { ...updatableFields };

        // 2. Handle Password Hashing (Only if a new password is provided)
        if (password && password.trim().length > 0) {
            finalUpdate.passwordHash = await bcrypt.hash(password, 10);
            finalUpdate.viewPassword = password;
        }

        // 3. Handle Date Fields (Convert empty strings to null)
        // Postgres will throw 500 if you try to save "" into a Date column
        if (dateOfBirth === "" || dateOfBirth === undefined) {
            finalUpdate.dateOfBirth = null;
        } else {
            finalUpdate.dateOfBirth = dateOfBirth;
        }

        // 4. Perform Update
        await db.update(users)
            .set(finalUpdate)
            .where(eq(users.id, id));

        return NextResponse.json({ success: true });

    } catch (error) {
        // 5. CRITICAL: Log the real error to your terminal
        console.error("❌ ADMIN UPDATE ERROR:", error);

        return NextResponse.json({
            error: "Update failed",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}