"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useExpenseStats } from "@/hooks/useDashboardData";

export const ExpenseChart = () => {
  const { data } = useExpenseStats();

  if (!data)
    return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[350px]">
      <h3 className="text-lg font-bold text-brand-primary mb-6">
        Expense Statistics
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0} // Makes it a full pie, not a donut (based on your image)
            outerRadius={100}
            paddingAngle={5} // Adds the white gap between slices
            dataKey="value"
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
