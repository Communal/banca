"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { CreditCard, DollarSign } from "lucide-react";

const IconWrapper = ({ type }: { type: string }) => {
  const bgColors: Record<string, string> = {
    card: "bg-[#FFF5D9]",
    paypal: "bg-[#E7EDFF]",
    transfer: "bg-[#DCFAF8]",
  };

  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColors[type]}`}>
      {type === "card" && <CreditCard className="text-[#FFBB38]" size={20} />}
      {type === "transfer" && <DollarSign className="text-[#16DBCC]" size={20} />}
    </div>
  );
};

export const RecentTransactions = () => {
  const { data, isLoading } = useTransactions(1, "all", 3);

  const transactions = data?.data ?? [];
  const isEmpty = !isLoading && transactions.length === 0;

  if (isLoading) {
    return <div className="h-[250px] bg-white rounded-3xl animate-pulse" />;
  }

  return (
    <div
      className={`bg-white p-6 rounded-3xl shadow-sm transition-all
        ${isEmpty ? "min-h-[120px]" : "min-h-[250px]"}`}
    >
      <h3 className="text-lg font-bold text-[#343C6A] mb-4">
        Recent Transactions
      </h3>

      {isEmpty ? (
        <p className="text-sm text-[#718EBF] text-center py-4">
          No recent transactions
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <IconWrapper type={tx.type} />
                <div>
                  <p className="font-bold text-[#232323]">
                    {tx.description}
                  </p>
                  <p className="text-sm text-[#718EBF]">
                    {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <span
                className={`font-bold ${Number(tx.amount) > 0
                    ? "text-[#41D4A8]"
                    : "text-[#FF4B4A]"
                  }`}
              >
                {Number(tx.amount) > 0 ? "+" : "-"}$
                {Math.abs(Number(tx.amount)).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
