import { NextResponse } from "next/server";
import { db } from "@/db";
import { cards, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET() {
    const session = await getSession();

    if (!session || !session.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const userCards = await db.query.cards.findMany({
            where: eq(cards.userId, session.userId as string),
        });
        return NextResponse.json(userCards);
    } catch (error) {
        console.error("Fetch Cards Error:", error);
        return NextResponse.json({ error: "Failed to fetch cards" }, { status: 500 });
    }
}

// POST: Add a new card for the logged-in user
export async function POST(req: Request) {
    const session = await getSession();

    if (!session || !session.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        if (!body.cardNumber || body.cardNumber.length < 4) {
            return NextResponse.json({ error: "Invalid card number" }, { status: 400 });
        }

        // 1. Fetch User to get their preferred currency
        const user = await db.query.users.findFirst({
            where: eq(users.id, session.userId as string),
            columns: { currency: true }
        });

        // 2. Insert Card using User's Currency
        const newCard = await db.insert(cards).values({
            ...body,
            userId: session.userId as string,
            balance: "0.00",
            currency: user?.currency || "USD",
            lastFourDigits: body.cardNumber.slice(-4),
            cardProvider: "mastercard",
        }).returning();

        return NextResponse.json(newCard[0]);
    } catch (error) {
        console.error("Add Card Error:", error);
        return NextResponse.json({ error: "Failed to add card" }, { status: 500 });
    }
}