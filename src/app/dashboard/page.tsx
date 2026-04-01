"use client";
import { WeeklyActivity } from "@/components/dashboard/WeeklyActivityChart";
import { ExpenseStatistics } from "@/components/dashboard/ExpenseStatistics";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
// import { QuickTransfer } from "@/components/dashboard/QuickTransfer";
import { BalanceHistory } from "@/components/dashboard/BalanceHistory";
import { useCards } from "@/hooks/useCards";
import { CreditCard } from "@/components/dashboard/cards/CreditCard";
import Link from "next/link";
import { Send } from "lucide-react"; // Import an icon for the button

// --- New Sub-Component for Dashboard ---
const MyPrimaryCard = () => {
  const { data: cards, isLoading } = useCards();

  if (isLoading)
    return (
      <div className="h-[210px] w-full bg-gray-200 rounded-[2rem] animate-pulse" />
    );

  // Find primary card or default to first
  const primaryCard =
    cards?.find((c) => c.cardType === "primary") || cards?.[0];

  if (!primaryCard) {
    return (
      <div className="h-[210px] w-full bg-white border border-dashed border-gray-300 rounded-[2rem] flex items-center justify-center text-gray-400">
        No cards found
      </div>
    );
  }

  return (
    <div className="w-full h-[210px]">
      <CreditCard card={primaryCard} className="w-full h-full" />
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Top Section Grid 
        Mobile: Stacked (Cards first because they are first in DOM)
        Desktop: 3 Columns (Charts Left, Cards Right via 'order' utility)
      */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* --- Right Column (Cards & Transactions) --- */}
        {/* Mobile: Appears 1st. Desktop: Moved to right (order-2) */}
        <div className="xl:col-span-1 xl:order-2 flex flex-col gap-8">
          {/* 1. My Cards Section */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#343C6A]">My Cards</h3>
              <Link
                href="/dashboard/cards"
                className="text-[#343C6A] text-sm font-semibold hover:text-[#2D60FF]"
              >
                See All
              </Link>
            </div>
            <MyPrimaryCard />
          </div>


          {/* 2. Recent Transactions */}
          <RecentTransactions />

          <Link
            href="/dashboard/transfers"
            className="w-full h-14 bg-[#1814F3] hover:bg-blue-700 text-white rounded-[1rem] flex items-center justify-center gap-2 font-medium text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Send size={20} className="-mt-1" />
            Quick Transfer
          </Link>

        </div>

        {/* --- Left Column (Charts) --- */}
        {/* Mobile: Appears 2nd. Desktop: Moved to left (order-1) */}
        <div className="xl:col-span-2 xl:order-1 flex flex-col gap-8">
          <WeeklyActivity />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ExpenseStatistics />
          </div>
        </div>

      </div>

      {/* Row 2: Quick Transfer & Balance History */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* <div className="xl:col-span-1">
          <QuickTransfer />
        </div> */}
        <div className="xl:col-span-2">
          <BalanceHistory />
        </div>
      </div>
    </div>
  );
}