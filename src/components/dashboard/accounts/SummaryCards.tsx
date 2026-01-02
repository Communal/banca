// src/components/dashboard/accounts/SummaryCards.tsx
"use client";

import {
  DollarSign,
  CreditCard,
  PiggyBank,
  Wallet,
  Euro,
  PoundSterling,
  JapaneseYen
} from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { formatCurrency } from "@/lib/currency";

interface SummaryCardsProps {
  data: {
    myBalance: number;
    income: number;
    expense: number;
    totalSaving: number;
  };
}

// Helper to get the right icon component
const getCurrencyIcon = (code: string) => {
  switch (code) {
    case "EUR": return Euro;
    case "GBP": return PoundSterling;
    case "JPY": return JapaneseYen;
    default: return DollarSign; // USD, CAD, AUD use DollarSign
  }
};

const Card = ({ title, amount, icon: Icon, bgColor, iconColor, currencyCode }: any) => (
  <div className="bg-white p-4 md:p-6 rounded-3xl flex items-center gap-4 shadow-sm">
    <div
      className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center ${iconColor}`}
    >
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[#718EBF] text-sm">{title}</p>
      <p className="text-[#343C6A] text-xl md:text-2xl font-bold">
        {formatCurrency(amount, currencyCode)}
      </p>
    </div>
  </div>
);

export const SummaryCards = ({ data }: SummaryCardsProps) => {
  const { data: authData } = useCurrentUser();
  const currencyCode = authData?.user?.currency || "USD";

  const CurrencyIcon = getCurrencyIcon(currencyCode);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8">
      <Card
        title="My Balance"
        amount={data.myBalance}
        icon={Wallet}
        bgColor="bg-yellow-100"
        iconColor="text-yellow-500"
        currencyCode={currencyCode}
      />
      <Card
        title="Income"
        amount={data.income}
        icon={CurrencyIcon} // <--- Dynamic Icon
        bgColor="bg-blue-100"
        iconColor="text-blue-500"
        currencyCode={currencyCode}
      />
      <Card
        title="Expense"
        amount={data.expense}
        icon={CreditCard}
        bgColor="bg-pink-100"
        iconColor="text-pink-500"
        currencyCode={currencyCode}
      />
      <Card
        title="Total Saving"
        amount={data.totalSaving}
        icon={PiggyBank}
        bgColor="bg-green-100"
        iconColor="text-green-500"
        currencyCode={currencyCode}
      />
    </div>
  );
};