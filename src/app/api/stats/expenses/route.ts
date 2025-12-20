import { NextResponse } from "next/server";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { sql, desc } from "drizzle-orm";

// Map DB types to colors
const COLOR_MAP: Record<string, string> = {
    shopping: '#343C6A', // Dark Blue
    service: '#FC7900',  // Orange
    transfer: '#FA00FF', // Pink
    entertainment: '#343C6A',
    bill: '#FC7900',
    investment: '#FA00FF',
    others: '#1814F3',   // Blue
};

export async function GET() {
    try {
        // Aggregating transactions by type to simulate expense categories
        const expenseData = await db
            .select({
                name: transactions.type,
                value: sql<number>`count(*)`.mapWith(Number), // Or sum(amount) if you prefer
            })
            .from(transactions)
            .groupBy(transactions.type);

        // Format for the chart
        const formattedStats = expenseData.map((item) => ({
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1), // Capitalize
            value: item.value,
            color: COLOR_MAP[item.name] || '#1814F3', // Default to Blue
        }));

        // If no data, return default structure to prevent chart crash
        if (formattedStats.length === 0) {
            return NextResponse.json([
                { name: 'No Data', value: 100, color: '#E5E7EB' }
            ]);
        }

        return NextResponse.json(formattedStats);

    } catch (error) {
        console.error("Error fetching expense stats:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}