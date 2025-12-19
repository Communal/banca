import { NextResponse } from "next/server";
import { db } from "@/db";
import { cards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth"; // Import session helper

// GET: Fetch all cards for the logged-in user
export async function GET() {
    // 1. Get the session (checks cookies)
    const session = await getSession();

    // 2. Validate Session
    if (!session || !session.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // 3. Fetch cards using the REAL userId
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

        // Basic validation to prevent crashing
        if (!body.cardNumber || body.cardNumber.length < 4) {
            return NextResponse.json({ error: "Invalid card number" }, { status: 400 });
        }

        // Insert into DB using the REAL userId
        const newCard = await db.insert(cards).values({
            // Spread form data (bankName, cardType, cardHolder, validThru, etc.)
            ...body,
            userId: session.userId as string,
            balance: "0.00", // Default balance for new cards
            lastFourDigits: body.cardNumber.slice(-4), // Extract last 4 digits
            cardProvider: "mastercard", // Default, or you can add a selector in the form
        }).returning();

        return NextResponse.json(newCard[0]);
    } catch (error) {
        console.error("Add Card Error:", error);
        return NextResponse.json({ error: "Failed to add card" }, { status: 500 });
    }
}