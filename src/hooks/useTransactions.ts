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

export const useTransactions = (
    page: number,
    filter: "all" | "income" | "expense",
    limit: number = 10
) => {
    return useQuery({
        queryKey: ["transactions", page, filter, limit],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                filter,
            });

            const res = await fetch(`/api/transactions?${params}`);
            if (!res.ok) throw new Error("Failed to fetch transactions");
            return res.json() as Promise<TransactionsResponse>;
        },
        placeholderData: (previousData) => previousData,
    });
};
