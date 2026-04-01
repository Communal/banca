import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, cards, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, cardId, amount, description, bankName, accountNumber, pins } = body;

        // 1. Fetch user to verify PINs
        const user = await db.query.users.findFirst({
            where: eq(users.id, userId),
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // 2. Validate Active PINs strictly
        if (user.pinOneActive && user.pinOne !== pins?.pinOne) {
            return NextResponse.json({ error: "Step 1 PIN is incorrect" }, { status: 403 });
        }
        if (user.pinTwoActive && user.pinTwo !== pins?.pinTwo) {
            return NextResponse.json({ error: "Step 2 PIN is incorrect" }, { status: 403 });
        }
        if (user.pinThreeActive && user.pinThree !== pins?.pinThree) {
            return NextResponse.json({ error: "Step 3 PIN is incorrect" }, { status: 403 });
        }

        // 3. Fetch funding card
        const card = await db.query.cards.findFirst({
            where: eq(cards.id, cardId),
        });

        if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });
        if (Number(card.balance) < Number(amount)) {
            return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
        }

        // 4. Calculate new balance
        const newBalance = (Number(card.balance) - Number(amount)).toString();

        // 5. Update Card Balance & Create Transaction (Ideally in a DB transaction, but keeping it simple based on your schema)
        await db.update(cards)
            .set({ balance: newBalance })
            .where(eq(cards.id, cardId));

        const displayId = `TXN-${uuidv4().substring(0, 8).toUpperCase()}`;

        await db.insert(transactions).values({
            cardId: cardId,
            description: description || `Transfer to ${accountNumber} at ${bankName}`,
            transactionIdDisplay: displayId,
            type: 'transfer',
            status: 'completed',
            amount: amount,
            date: new Date(),
        });

        return NextResponse.json({ success: true, transactionId: displayId });

    } catch (error) {
        console.error("TRANSFER ERROR:", error);
        return NextResponse.json({ error: "Transfer processing failed" }, { status: 500 });
    }
}