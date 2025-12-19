import { useQuery } from '@tanstack/react-query';

// --- Types ---
export interface Transaction {
    id: string;
    type: 'card' | 'paypal' | 'transfer';
    title: string;
    date: string;
    amount: number;
}

// NEW: Added Balance History type
export interface BalancePoint {
    month: string;
    balance: number;
}

// --- Mock API Call ---
const fetchDashboardData = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        weeklyActivity: [
            { day: 'Sat', deposit: 480, withdraw: 240 },
            { day: 'Sun', deposit: 350, withdraw: 120 },
            { day: 'Mon', deposit: 330, withdraw: 260 },
            { day: 'Tue', deposit: 480, withdraw: 370 },
            { day: 'Wed', deposit: 150, withdraw: 220 },
            { day: 'Thu', deposit: 390, withdraw: 240 },
            { day: 'Fri', deposit: 400, withdraw: 320 },
        ],
        expenseStats: [
            { name: 'Entertainment', value: 30, color: '#343C6A' },
            { name: 'Bill Expense', value: 15, color: '#FC7900' },
            { name: 'Investment', value: 20, color: '#FA00FF' },
            { name: 'Others', value: 35, color: '#1814F3' },
        ],
        recentTransactions: [
            { id: '1', type: 'card', title: 'Deposit from my Card', date: '28 January 2021', amount: -850 },
            { id: '2', type: 'paypal', title: 'Deposit Paypal', date: '25 January 2021', amount: 2500 },
            { id: '3', type: 'transfer', title: 'Jemi Wilson', date: '21 January 2021', amount: 5400 },
        ] as Transaction[],
        // NEW: Added Balance History mock data
        balanceHistory: [
            { month: 'Jul', balance: 120 },
            { month: 'Aug', balance: 300 },
            { month: 'Sep', balance: 240 },
            { month: 'Oct', balance: 480 },
            { month: 'Nov', balance: 400 },
            { month: 'Dec', balance: 600 },
            { month: 'Jan', balance: 550 },
        ] as BalancePoint[]
    };
};

export const useDashboardData = () => {
    return useQuery({
        queryKey: ['dashboard-main'],
        queryFn: fetchDashboardData,
        staleTime: 1000 * 60 * 5,
    });
};