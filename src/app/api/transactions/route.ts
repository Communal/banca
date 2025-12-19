import { NextResponse } from "next/server";
import { db } from "@/db";
import { transactions, cards } from "@/db/schema";
import { eq, desc, and, gt, lt, sql } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
    const session = await getSession();
    if (!session || !session.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const filter = searchParams.get("filter") || "all"; // 'all', 'income', 'expense'

    try {
        const offset = (page - 1) * limit;

        // 1. Build Conditions
        const conditions = [
            eq(cards.userId, session.userId as string) // Ensure user owns the card
        ];

        if (filter === "income") {
            conditions.push(gt(transactions.amount, "0"));
        } else if (filter === "expense") {
            conditions.push(lt(transactions.amount, "0"));
        }

        // 2. Fetch Transactions with Card info
        const data = await db
            .select({
                id: transactions.id,
                description: transactions.description,
                transactionId: transactions.transactionIdDisplay,
                type: transactions.type,
                amount: transactions.amount,
                date: transactions.date,
                cardLastFour: cards.lastFourDigits,
                receipt: transactions.receiptUrl,
            })
            .from(transactions)
            .innerJoin(cards, eq(transactions.cardId, cards.id)) // Join to check ownership & get card #
            .where(and(...conditions))
            .orderBy(desc(transactions.date))
            .limit(limit)
            .offset(offset);

        // 3. Get Total Count for Pagination
        // Note: Drizzle count is a bit verbose, simplified here
        const totalResult = await db
            .select({ count: sql<number>`count(*)` })
            .from(transactions)
            .innerJoin(cards, eq(transactions.cardId, cards.id))
            .where(and(...conditions));

        const totalItems = Number(totalResult[0].count);
        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json({
            data,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
            },
        });

    } catch (error) {
        console.error("Transactions API Error:", error);
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}