import { Settings, User, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const IconMap: any = {
  shopping: <RefreshCw size={20} className="text-[#16DBCC]" />,
  service: <Settings size={20} className="text-[#1814F3]" />,
  transfer: <User size={20} className="text-[#FF82AC]" />,
};
const BgMap: any = {
  shopping: "bg-[#E7EDFF]",
  service: "bg-[#E7EDFF]",
  transfer: "bg-[#FFE0EB]",
};

export const LastTransactionsCard = ({
  transactions,
}: {
  transactions: any[];
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm h-full">
      <h3 className="text-[#343C6A] text-lg font-bold mb-6">
        Last Transaction
      </h3>
      <div className="flex flex-col gap-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  BgMap[tx.type] || "bg-gray-100"
                }`}
              >
                {IconMap[tx.type] || (
                  <CreditCard size={20} className="text-gray-500" />
                )}
              </div>
              <div>
                <p className="text-[#343C6A] font-bold text-sm">
                  {tx.description}
                </p>
                <p className="text-[#718EBF] text-xs">{formatDate(tx.date)}</p>
              </div>
            </div>

            {/* Desktop-only details */}
            <div className="hidden md:block text-[#343C6A] text-sm capitalize">
              {tx.type}
            </div>
            <div className="hidden md:block text-[#343C6A] text-sm">
              {tx.cardLastFour} ****
            </div>
            <div className="hidden md:block text-[#718EBF] text-sm capitalize">
              {tx.status}
            </div>

            <span
              className={cn(
                "font-bold text-sm",
                Number(tx.amount) > 0 ? "text-[#41D4A8]" : "text-[#FE5C73]"
              )}
            >
              {Number(tx.amount) > 0 ? "+" : ""}$
              {Math.abs(Number(tx.amount)).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
