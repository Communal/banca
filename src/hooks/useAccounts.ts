// src/hooks/useAccounts.ts
import { useQuery } from "@tanstack/react-query";

// Types based on API response
interface Transaction {
    id: string;
    description: string;
    type: string;
    date: string;
    amount: string;
    cardLastFour: string;
    status: string;
}

interface ChartPoint {
    day: string;
    debit: number;
    credit: number;
}

interface AccountsOverviewData {
    summary: {
        myBalance: number;
        income: number;
        expense: number;
        totalSaving: number;
    };
    lastTransactions: Transaction[];
    chartData: ChartPoint[];
}

export const useAccountsOverview = () => {
    return useQuery({
        queryKey: ["accounts-overview"],
        queryFn: async () => {
            const res = await fetch("/api/accounts/overview");
            if (!res.ok) throw new Error("Failed to fetch accounts overview");
            return res.json() as Promise<AccountsOverviewData>;
        },
    });
};