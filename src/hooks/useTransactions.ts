import { useQuery } from "@tanstack/react-query";

interface Transaction {
    id: string;
    description: string;
    transactionId: string;
    type: string;
    amount: string; // Decimal string from DB
    date: string;
    cardLastFour: string;
    receipt: string | null;
}

interface TransactionsResponse {
    data: Transaction[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}

export const useTransactions = (page: number, filter: "all" | "income" | "expense") => {
    return useQuery({
        queryKey: ["transactions", page, filter],
        queryFn: async () => {
            // Build query string
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                filter,
            });

            const res = await fetch(`/api/transactions?${params}`);
            if (!res.ok) throw new Error("Failed to fetch transactions");
            return res.json() as Promise<TransactionsResponse>;
        },
        placeholderData: (previousData) => previousData, // Keep previous data while fetching new page (smooth transition)
    });
};