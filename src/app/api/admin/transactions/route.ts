import { NextResponse } from "next/server";
import { db } from "@/db";
import { transactions, cards } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { cardId, description, type, status, amount, date } = body;

        if (!cardId || !description || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Generate a random Transaction ID #123456
        const transactionIdDisplay = `#${Math.floor(100000 + Math.random() * 900000)}`;

        const [newTx] = await db.insert(transactions).values({
            cardId,
            description,
            transactionIdDisplay,
            type,
            status: status || 'completed',
            amount: amount.toString(), // Ensure string for decimal
            date: new Date(date),
        }).returning();

        // OPTIONAL: Update card balance here if you want real-time syncing
        // await db.update(cards)
        //   .set({ balance: sql`${cards.balance} + ${amount}` })
        //   .where(eq(cards.id, cardId));

        return NextResponse.json(newTx);
    } catch (error) {
        console.error("Error creating transaction:", error);
        return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
    }
}

// Simple Delete Endpoint
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await db.delete(transactions).where(eq(transactions.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}