import { NextResponse } from "next/server";
import { db } from "@/db";
import { transactions, cards } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const transaction = await db.select({
            id: transactions.id,
            description: transactions.description,
            transactionIdDisplay: transactions.transactionIdDisplay,
            type: transactions.type,
            status: transactions.status,
            amount: transactions.amount,
            date: transactions.date,
            receiptUrl: transactions.receiptUrl,
            cardLastFour: cards.lastFourDigits,
            bankName: cards.bankName
        })
            .from(transactions)
            .leftJoin(cards, eq(transactions.cardId, cards.id))
            .where(eq(transactions.id, id))
            .limit(1);

        if (!transaction || transaction.length === 0) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(transaction[0]);

    } catch (error) {
        console.error("TRANSACTION FETCH ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch transaction details" }, { status: 500 });
    }
}