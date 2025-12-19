import { WeeklyActivity } from "@/components/dashboard/WeeklyActivityChart";
import { ExpenseStatistics } from "@/components/dashboard/ExpenseStatistics";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { QuickTransfer } from "@/components/dashboard/QuickTransfer";
import { BalanceHistory } from "@/components/dashboard/BalanceHistory";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Row 1: Weekly Activity (2/3) & Recent Transactions (1/3) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <WeeklyActivity />
        </div>
        <div className="xl:col-span-1">
          <RecentTransactions />
        </div>
      </div>

      {/* Row 2: Quick Transfer (1/3) & Expense Stats (2/3) */}
      {/* Note: The design shows Expense as a Pie chart. Adjust col-spans based on your preference */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <ExpenseStatistics /> {/* Or reverse if Quick Transfer is smaller */}
        </div>
        <div className="xl:col-span-1">
          <QuickTransfer />
        </div>
      </div>

      {/* Row 3: Balance History (Full Width) */}
      <div className="w-full">
        <BalanceHistory />
      </div>
    </div>
  );
}
