"use client";

import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { TransactionFormDialog } from "@/components/admin/TransactionFormDialog";

export default function EditUserTransactions({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch User, Cards, and Transactions
  const { data, isLoading } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${id}`);
      return res.json();
    },
  });

  const handleDelete = async (txId: string) => {
    if (!confirm("Delete transaction?")) return;
    try {
      await fetch(`/api/admin/transactions?id=${txId}`, { method: 'DELETE' });
      queryClient.invalidateQueries({ queryKey: ["admin-user", id] });
      toast.success("Deleted");
    } catch (e) {
      toast.error("Failed");
    }
  };

  if (isLoading)
    return <div className="animate-pulse h-96 bg-gray-50 rounded-xl" />;

  const transactions = data?.transactions || [];
  const cards = data?.cards || [];

  // Filter Logic
  const filteredTransactions = transactions.filter((tx: any) => {
    const amount = Number(tx.amount);
    if (activeTab === "income") return amount > 0;
    if (activeTab === "expense") return amount < 0;
    return true;
  });

  return (
    <div className="space-y-6">

      {/* Header + Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-2">
        <h3 className="text-[#343C6A] text-xl font-bold">Recent Transactions</h3>

        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-sm font-medium">
            <button
              onClick={() => setActiveTab("all")}
              className={cn("pb-2 transition-colors relative",
                activeTab === "all" ? "text-[#1814F3] border-b-2 border-[#1814F3]" : "text-[#718EBF]"
              )}
            >
              All Transactions
            </button>
            <button
              onClick={() => setActiveTab("income")}
              className={cn("pb-2 transition-colors relative",
                activeTab === "income" ? "text-[#1814F3] border-b-2 border-[#1814F3]" : "text-[#718EBF]"
              )}
            >
              Income
            </button>
            <button
              onClick={() => setActiveTab("expense")}
              className={cn("pb-2 transition-colors relative",
                activeTab === "expense" ? "text-[#1814F3] border-b-2 border-[#1814F3]" : "text-[#718EBF]"
              )}
            >
              Expense
            </button>
          </div>

          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#1814F3] hover:bg-blue-700 rounded-xl px-6 h-10 ml-4"
          >
            + Add New
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="text-[#718EBF] text-sm border-b border-gray-100">
              <th className="font-medium py-3 px-4">Description</th>
              <th className="font-medium py-3">Transaction ID</th>
              <th className="font-medium py-3">Type</th>
              <th className="font-medium py-3">Card</th>
              <th className="font-medium py-3">Date</th>
              <th className="font-medium py-3">Amount</th>
              <th className="font-medium py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[#232323] text-sm">
            {filteredTransactions.map((tx: any) => {
              const amt = Number(tx.amount);
              const isIncome = amt > 0;

              return (
                <tr
                  key={tx.id}
                  className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors group"
                >
                  {/* Description with Icon */}
                  <td className="py-4 px-4 flex items-center gap-3">
                    {isIncome ? (
                      <ArrowDownCircle className="text-[#16DBCC] w-6 h-6 shrink-0" />
                    ) : (
                      <ArrowUpCircle className="text-[#FE5C73] w-6 h-6 shrink-0" />
                    )}
                    <span className="font-medium text-[#232323]">{tx.description}</span>
                  </td>

                  <td className="py-4 text-[#232323]">
                    {tx.transactionIdDisplay}
                  </td>
                  <td className="py-4 text-[#232323] capitalize">{tx.type}</td>
                  <td className="py-4 text-[#232323]">
                    {/* Access card details from joined query or relation */}
                    {tx.card?.lastFourDigits || tx.cardLastFour} ****
                  </td>
                  <td className="py-4 text-[#232323]">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      day: "numeric", month: "short", hour: "numeric", minute: "numeric"
                    })}
                  </td>
                  <td
                    className={cn(
                      "py-4 font-medium",
                      isIncome ? "text-[#41D4A8]" : "text-[#FE5C73]"
                    )}
                  >
                    {isIncome ? "+" : ""}${Math.abs(amt).toLocaleString()}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => handleDelete(tx.id)}
                      className="text-[#FE5C73] border border-[#FE5C73] px-6 py-1.5 rounded-full text-xs hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TransactionFormDialog
        userId={id}
        userCards={cards}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
    </div>
  );
}