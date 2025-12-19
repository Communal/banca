"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";

export const WeeklyActivity = () => {
  const { data, isLoading } = useDashboardData();

  if (isLoading)
    return <div className="h-[350px] bg-white rounded-3xl animate-pulse" />;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm h-[350px]">
      <h3 className="text-lg font-bold text-[#343C6A] mb-6">Weekly Activity</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data?.weeklyActivity} barGap={15}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#F3F3F5"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#718EBF" }}
            dy={10}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#718EBF" }} />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Legend
            iconType="circle"
            align="right"
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: "20px" }}
          />
          <Bar
            dataKey="deposit"
            name="Deposit"
            fill="#1814F3"
            radius={10}
            barSize={15}
          />
          <Bar
            dataKey="withdraw"
            name="Withdraw"
            fill="#16DBCC"
            radius={10}
            barSize={15}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
