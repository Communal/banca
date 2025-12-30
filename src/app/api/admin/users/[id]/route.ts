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

        const {
            id: _id,
            createdAt,
            updatedAt,
            password,
            passwordHash,
            dateOfBirth,
            ...updatableFields
        } = body;

        let finalUpdate: any = { ...updatableFields };

        // Handle Password
        if (password && password.trim().length > 0) {
            finalUpdate.passwordHash = await bcrypt.hash(password, 10);
            finalUpdate.viewPassword = password;
        }

        // Handle Date
        if (dateOfBirth === "" || dateOfBirth === undefined) {
            finalUpdate.dateOfBirth = null;
        } else {
            finalUpdate.dateOfBirth = dateOfBirth;
        }

        // --- STATUS LOGIC ---
        // If status is Active, clear the reason.
        if (finalUpdate.status === 'active') {
            finalUpdate.statusReason = null;
        }

        await db.update(users)
            .set(finalUpdate)
            .where(eq(users.id, id));

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("❌ ADMIN UPDATE ERROR:", error);
        return NextResponse.json({
            error: "Update failed",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
