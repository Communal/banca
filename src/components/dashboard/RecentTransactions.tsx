"use client";
import { useDashboardData, Transaction } from "@/hooks/useDashboardData";
import { CreditCard, DollarSign } from "lucide-react"; // Fallback icons

const IconWrapper = ({ type }: { type: Transaction["type"] }) => {
  const bgColors = {
    card: "bg-[#FFF5D9]",
    paypal: "bg-[#E7EDFF]",
    transfer: "bg-[#DCFAF8]",
  };
  // You would map real icons (Paypal logo, etc) here
  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColors[type]}`}
    >
      {type === "card" && <CreditCard className="text-[#FFBB38]" size={20} />}
      {type === "paypal" && <span className="text-[#396AFF] font-bold">P</span>}
      {type === "transfer" && (
        <DollarSign className="text-[#16DBCC]" size={20} />
      )}
    </div>
  );
};

export const RecentTransactions = () => {
  const { data, isLoading } = useDashboardData();

  if (isLoading)
    return <div className="h-[250px] bg-white rounded-3xl animate-pulse" />;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm h-full min-h-[250px] flex flex-col justify-between">
      <h3 className="text-lg font-bold text-[#343C6A] mb-4">
        Recent Transaction
      </h3>
      <div className="flex flex-col gap-4">
        {data?.recentTransactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <IconWrapper type={tx.type} />
              <div>
                <p className="font-bold text-[#232323]">{tx.title}</p>
                <p className="text-sm text-[#718EBF]">{tx.date}</p>
              </div>
            </div>
            <span
              className={`font-bold ${
                tx.amount > 0 ? "text-[#41D4A8]" : "text-[#FF4B4A]"
              }`}
            >
              {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
