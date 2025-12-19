import { NextResponse } from "next/server";
import { db } from "@/db";
import { accounts, transactions, cards } from "@/db/schema";
import { eq, desc, and, sql, gte } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || !session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.userId as string;

  try {
    // 1. Fetch Account Balances
    const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, userId));
    const myBalance = userAccounts.find(a => a.type === 'checking')?.balance || '0';
    const totalSaving = userAccounts.find(a => a.type === 'savings')?.balance || '0';

    // 2. Calculate Total Income & Expense (All time)
    const incomeResult = await db.select({ total: sql<string>`sum(${transactions.amount})` })
      .from(transactions)
      .innerJoin(cards, eq(transactions.cardId, cards.id))
      .where(and(eq(cards.userId, userId), sql`${transactions.amount} > 0`));

    const expenseResult = await db.select({ total: sql<string>`sum(${transactions.amount})` })
      .from(transactions)
      .innerJoin(cards, eq(transactions.cardId, cards.id))
      .where(and(eq(cards.userId, userId), sql`${transactions.amount} < 0`));

    // 3. Fetch Last 3 Transactions
    const lastTransactions = await db.select({
      id: transactions.id,
      description: transactions.description,
      type: transactions.type,
      date: transactions.date,
      amount: transactions.amount,
      cardLastFour: cards.lastFourDigits,
      status: transactions.status,
    })
      .from(transactions)
      .innerJoin(cards, eq(transactions.cardId, cards.id))
      .where(eq(cards.userId, userId))
      .orderBy(desc(transactions.date))
      .limit(3);

    // 4. Calculate Weekly Debit & Credit for Chart
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    // Reset time to midnight to ensure we catch full days
    oneWeekAgo.setHours(0, 0, 0, 0);

    const weeklyDataRaw = await db.select({
      dayOfWeek: sql<number>`extract(dow from ${transactions.date})`,
      type: sql<string>`case when ${transactions.amount} > 0 then 'credit' else 'debit' end`,
      total: sql<string>`sum(abs(${transactions.amount}))`,
    })
      .from(transactions)
      .innerJoin(cards, eq(transactions.cardId, cards.id))
      .where(and(eq(cards.userId, userId), gte(transactions.date, oneWeekAgo)))
      .groupBy(sql`extract(dow from ${transactions.date})`, sql`case when ${transactions.amount} > 0 then 'credit' else 'debit' end`);

    // --- FIX IS HERE ---
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const chartData = days.map((day, index) => {
      // FIX: Use Number() to ensure types match (DB might return string "1", index is number 1)
      const debitEntry = weeklyDataRaw.find(d => Number(d.dayOfWeek) === index && d.type === 'debit');
      const creditEntry = weeklyDataRaw.find(d => Number(d.dayOfWeek) === index && d.type === 'credit');

      return {
        day,
        debit: Number(debitEntry?.total || 0),
        credit: Number(creditEntry?.total || 0)
      };
    });

    return NextResponse.json({
      summary: {
        myBalance: Number(myBalance),
        income: Number(incomeResult[0]?.total || 0),
        expense: Math.abs(Number(expenseResult[0]?.total || 0)),
        totalSaving: Number(totalSaving),
      },
      lastTransactions,
      chartData,
    });

  } catch (error) {
    console.error("Accounts Overview Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}