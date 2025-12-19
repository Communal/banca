"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";

export const BalanceHistory = () => {
  const { data, isLoading } = useDashboardData();

  if (isLoading)
    return <div className="h-[300px] bg-white rounded-3xl animate-pulse" />;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm h-[300px]">
      <h3 className="text-lg font-bold text-[#343C6A] mb-6">Balance History</h3>
      <div className="h-[80%] w-full font-medium text-sm">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data?.balanceHistory}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {/* Gradient Definition for the area fill */}
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D60FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2D60FF" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F3F3F5"
            />

            {/* Axis styling to match design colors */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718EBF" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718EBF" }}
              dx={-10}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#343C6A",
                color: "#fff",
                borderRadius: "10px",
                border: "none",
              }}
              itemStyle={{ color: "#fff" }}
              cursor={{
                stroke: "#2D60FF",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
            />

            {/* The actual line/area */}
            <Area
              type="monotone" // Smooth curves
              dataKey="balance"
              stroke="#2D60FF" // Brand blue line color
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBalance)" // References the gradient defined above
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};