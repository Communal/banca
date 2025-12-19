import { NextResponse } from "next/server";
import { db } from "@/db";
import { cards, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // 1. Type it as a Promise
) {
    try {
        // 2. Await the params before accessing .id
        const { id } = await params;

        const card = await db.query.cards.findFirst({
            where: eq(cards.id, id),
            with: {
                transactions: {
                    limit: 5,
                    orderBy: (transactions, { desc }) => [desc(transactions.date)],
                },
            },
        });

        if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });

        return NextResponse.json(card);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching details" }, { status: 500 });
    }
}