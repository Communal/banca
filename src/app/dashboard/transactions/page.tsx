"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomPagination } from "@/components/ui/CustomPagination";

// --- HELPERS ---

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const TransactionIcon = ({ amount }: { amount: number }) => {
  return amount > 0 ? (
    <ArrowUpCircle className="text-[#16DBCC] w-6 h-6 md:w-8 md:h-8" />
  ) : (
    <ArrowDownCircle className="text-[#FE5C73] w-6 h-6 md:w-8 md:h-8" />
  );
};

// --- TABS COMPONENT ---
// (Defined outside render to prevent recreation)
interface TabsProps {
  filter: "all" | "income" | "expense";
  setFilter: (filter: "all" | "income" | "expense") => void;
  setPage: (page: number) => void;
}

const Tabs = ({ filter, setFilter, setPage }: TabsProps) => (
  <div className="flex gap-8 border-b border-gray-200 mb-6 text-sm font-medium">
    {["all", "income", "expense"].map((tab) => (
      <button
        key={tab}
        onClick={() => {
          setFilter(tab as any);
          setPage(1);
        }}
        className={cn(
          "pb-3 capitalize transition-colors relative",
          filter === tab
            ? "text-[#1814F3]"
            : "text-[#718EBF] hover:text-[#343C6A]"
        )}
      >
        {tab === "all" ? "All Transactions" : tab}
        {filter === tab && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1814F3] rounded-t-md" />
        )}
      </button>
    ))}
  </div>
);

// --- MAIN PAGE ---

export default function TransactionsPage() {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useTransactions(page, filter);
  const transactions = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="flex flex-col gap-6 bg-white min-h-screen p-6 rounded-3xl">
      {/* Header / Tabs */}
      <div>
        <h2 className="text-xl font-bold text-[#343C6A] mb-4 md:hidden">
          Recent Transactions
        </h2>
        <Tabs filter={filter} setFilter={setFilter} setPage={setPage} />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-50 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#718EBF] border-b border-gray-100">
                  <th className="pb-4 font-medium">Description</th>
                  <th className="pb-4 font-medium">Transaction ID</th>
                  <th className="pb-4 font-medium">Type</th>
                  <th className="pb-4 font-medium">Card</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium">Amount</th>
                  <th className="pb-4 font-medium">Receipt</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#232323]">
                {transactions.map((tx) => {
                  const amt = Number(tx.amount);
                  return (
                    <tr
                      key={tx.id}
                      className="border-b border-gray-50 last:border-none hover:bg-gray-50/50"
                    >
                      <td className="py-4 flex items-center gap-3">
                        <TransactionIcon amount={amt} />
                        <span className="font-medium">{tx.description}</span>
                      </td>
                      <td className="py-4 text-[#232323]">
                        {tx.transactionId}
                      </td>
                      <td className="py-4 text-[#232323] capitalize">
                        {tx.type}
                      </td>
                      <td className="py-4 text-[#232323]">
                        {tx.cardLastFour} ****
                      </td>
                      <td className="py-4 text-[#232323]">
                        {formatDate(tx.date)}
                      </td>
                      <td
                        className={cn(
                          "py-4 font-medium",
                          amt > 0 ? "text-[#41D4A8]" : "text-[#FE5C73]"
                        )}
                      >
                        {amt > 0 ? "+" : ""}${Math.abs(amt).toLocaleString()}
                      </td>
                      <td className="py-4">
                        <button className="border border-[#123288] text-[#123288] rounded-full px-4 py-1.5 text-xs font-medium hover:bg-blue-50 transition-colors">
                          Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="md:hidden flex flex-col gap-3">
            {transactions.map((tx) => {
              const amt = Number(tx.amount);
              return (
                <div
                  key={tx.id}
                  className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <TransactionIcon amount={amt} />
                    <div>
                      <p className="font-bold text-[#232323] text-sm">
                        {tx.description}
                      </p>
                      <p className="text-xs text-[#718EBF] mt-1">
                        {formatDate(tx.date)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "font-bold text-sm",
                      amt > 0 ? "text-[#41D4A8]" : "text-[#FE5C73]"
                    )}
                  >
                    {amt > 0 ? "+" : ""}${Math.abs(amt).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Reusable Pagination */}
          {pagination && (
            <CustomPagination
              currentPage={page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
