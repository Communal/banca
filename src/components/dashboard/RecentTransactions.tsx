"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { formatCurrency } from "@/lib/currency";
import Link from "next/link";
import {
  CreditCard,
  DollarSign,
  Euro,
  PoundSterling,
  JapaneseYen
} from "lucide-react";

// Helper to render correct icon
const CurrencyIcon = ({ code, className, size }: { code: string, className?: string, size?: number }) => {
  const props = { className, size };
  switch (code) {
    case "EUR": return <Euro {...props} />;
    case "GBP": return <PoundSterling {...props} />;
    case "JPY": return <JapaneseYen {...props} />;
    default: return <DollarSign {...props} />;
  }
};

const IconWrapper = ({ type, currencyCode }: { type: string, currencyCode: string }) => {
  const bgColors: Record<string, string> = {
    card: "bg-[#FFF5D9]",
    paypal: "bg-[#E7EDFF]",
    transfer: "bg-[#DCFAF8]",
  };

  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${bgColors[type] || "bg-gray-100"}`}>
      {type === "card" && <CreditCard className="text-[#FFBB38]" size={20} />}
      {type === "transfer" && <CurrencyIcon code={currencyCode} className="text-[#16DBCC]" size={20} />}
    </div>
  );
};

export const RecentTransactions = () => {
  const { data: transactionData, isLoading } = useTransactions(1, "all", 3);
  const { data: authData } = useCurrentUser();

  const user = authData?.user || authData;
  const currencyCode = user?.currency || "USD";

  const transactions = transactionData?.data ?? [];
  const isEmpty = !isLoading && transactions.length === 0;

  if (isLoading) {
    return <div className="h-62.5 bg-white rounded-3xl animate-pulse" />;
  }

  return (
    <div
      className={`bg-white p-6 rounded-3xl shadow-sm transition-all
        ${isEmpty ? "min-h-30" : "min-h-62.5"}`}
    >
      <h3 className="text-lg font-bold text-[#343C6A] mb-4">
        Recent Transactions
      </h3>

      {isEmpty ? (
        <p className="text-sm text-[#718EBF] text-center py-4">
          No recent transactions
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {transactions.map((tx: any) => (
            <Link
              href={`/dashboard/transactions/${tx.id}`}
              key={tx.id}
              className="flex items-center justify-between hover:bg-gray-50 p-2 -mx-2 rounded-2xl transition-colors group"
            >
              {/* Left Side: Icon & Text (Using flex-1 min-w-0 to enforce truncation) */}
              <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                <IconWrapper type={tx.type} currencyCode={currencyCode} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#232323] truncate group-hover:text-[#1814F3] transition-colors">
                    {tx.description}
                  </p>
                  <p className="text-sm text-[#718EBF] truncate">
                    {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right Side: Amount (Fixed width, won't shrink) */}
              <span
                className={`font-bold w-24 shrink-0 text-right whitespace-nowrap ${Number(tx.amount) > 0
                  ? "text-[#41D4A8]"
                  : "text-[#FF4B4A]"
                  }`}
              >
                {Number(tx.amount) > 0 ? "+" : "-"}
                {formatCurrency(Math.abs(Number(tx.amount)), currencyCode)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};