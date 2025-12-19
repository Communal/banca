"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";

// Custom Tooltip to match design style
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#343C6A] text-white p-3 rounded-lg shadow-md text-sm">
        <p className="font-bold">{`${payload[0].name}`}</p>
        <p>{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export const ExpenseStatistics = () => {
  const { data, isLoading } = useDashboardData();

  if (isLoading)
    return <div className="h-[350px] bg-white rounded-3xl animate-pulse" />;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm h-[350px]">
      <h3 className="text-lg font-bold text-[#343C6A] mb-6">
        Expense Statistics
      </h3>
      <div className="h-[85%] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data?.expenseStats}
              cx="50%"
              cy="50%"
              innerRadius={60} // Creates the "donut" hole
              outerRadius={100}
              paddingAngle={5} // White space between slices
              dataKey="value"
              stroke="none"
            >
              {data?.expenseStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
