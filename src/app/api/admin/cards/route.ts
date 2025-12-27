import { NextResponse } from "next/server";
import { db } from "@/db";
import { cards, users } from "@/db/schema"; // 1. Import users schema
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, bankName, cardType, cardProvider, cardNumber, cardHolder, validThru, balance } = body;

        if (!userId || !cardNumber || !cardHolder) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // --- FIX START ---
        // 2. Fetch the User to get their preferred currency
        const targetUser = await db.query.users.findFirst({
            where: eq(users.id, userId),
            columns: { currency: true }
        });

        const userCurrency = targetUser?.currency || "USD";
        // --- FIX END ---

        // Extract last 4 digits
        const lastFour = cardNumber.slice(-4);

        const [newCard] = await db.insert(cards).values({
            userId,
            bankName,
            cardType,
            cardProvider,
            cardNumber,
            lastFourDigits: lastFour,
            cardHolder,
            validThru,
            balance: balance || "0.00",
            currency: userCurrency, // 3. Use the fetched currency
            isActive: true,
        }).returning();

        return NextResponse.json(newCard);
    } catch (error) {
        console.error("Error creating card:", error);
        return NextResponse.json({ error: "Failed to create card" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, ...updates } = body;

        if (!id) return NextResponse.json({ error: "Card ID required" }, { status: 400 });

        // If card number changes, update last four digits
        if (updates.cardNumber) {
            updates.lastFourDigits = updates.cardNumber.slice(-4);
        }

        const [updatedCard] = await db
            .update(cards)
            .set(updates)
            .where(eq(cards.id, id))
            .returning();

        return NextResponse.json(updatedCard);
    } catch (error) {
        console.error("Error updating card:", error);
        return NextResponse.json({ error: "Failed to update card" }, { status: 500 });
    }
}