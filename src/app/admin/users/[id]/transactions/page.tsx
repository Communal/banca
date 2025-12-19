"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function EditUserTransactions({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${id}`);
      return res.json();
    },
  });

  const handleDelete = (id: string) => {
    if (!confirm("Delete transaction?")) return;
    toast.info("Delete functionality would go here");
  };

  if (isLoading)
    return <div className="animate-pulse h-96 bg-gray-50 rounded-xl" />;

  const transactions = data?.transactions || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[#343C6A] text-xl font-bold">
          Recent Transactions
        </h3>
        <Button className="bg-[#1814F3] hover:bg-blue-700 rounded-xl px-6 h-10">
          Add New
        </Button>
      </div>

      <div className="overflow-x-auto">
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
            {transactions.map((tx: any) => {
              const amt = Number(tx.amount);
              return (
                <tr
                  key={tx.id}
                  className="border-b border-gray-50 last:border-none hover:bg-gray-50/50"
                >
                  <td className="py-4 px-4 flex items-center gap-3">
                    {amt > 0 ? (
                      <ArrowUpCircle className="text-[#16DBCC] w-6 h-6" />
                    ) : (
                      <ArrowDownCircle className="text-[#FE5C73] w-6 h-6" />
                    )}
                    <span className="font-medium">{tx.description}</span>
                  </td>
                  <td className="py-4 text-[#232323]">
                    {tx.transactionIdDisplay || "#123456"}
                  </td>
                  <td className="py-4 text-[#232323] capitalize">{tx.type}</td>
                  <td className="py-4 text-[#232323]">
                    {tx.cardLastFour} ****
                  </td>
                  <td className="py-4 text-[#232323]">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "numeric",
                    })}
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
