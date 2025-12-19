"use client";
import { useAccountsOverview } from "@/hooks/useAccounts";
import { SummaryCards } from "@/components/dashboard/accounts/SummaryCards";
import { LastTransactionsCard } from "@/components/dashboard/accounts/LastTransactionsCard";
import { DebitCreditChart } from "@/components/dashboard/accounts/DebitCreditChart";

export default function AccountsPage() {
  const { data, isLoading } = useAccountsOverview();

  if (isLoading) {
    return <div className="h-screen bg-gray-100 animate-pulse" />;
  }

  if (!data) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Top Summary Cards */}
      <SummaryCards data={data.summary} />

      {/* 2. Last Transactions (Full Width) */}
      <div className="w-full">
        <LastTransactionsCard transactions={data.lastTransactions} />
      </div>

      {/* 3. Debit & Credit Chart (Full Width, Under Transactions) */}
      <div className="w-full">
        <DebitCreditChart data={data.chartData} />
      </div>
    </div>
  );
}
