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

export const DebitCreditChart = ({ data }: { data: any[] }) => {
  // 1. Safety Check: If no data, show a message
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm h-87.5 flex flex-col items-center justify-center">
        <h3 className="text-[#343C6A] text-lg font-bold mb-2">
          Debit & Credit Overview
        </h3>
        <p className="text-gray-400">
          No activity data available for this week.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm h-[350px] md:h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#343C6A] text-lg font-bold">
          Debit & Credit Overview
        </h3>
        {/* Dynamic Legend text (Hidden on mobile) */}
        <p className="text-[#718EBF] text-sm hidden md:block">
          <span className="text-[#343C6A]">Last 7 Days</span> Activity
        </p>
      </div>

      <div className="w-full h-[85%]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={12}>
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
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718EBF" }}
              hide={true} // Hidden as per design
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Legend
              align="right"
              verticalAlign="top"
              iconType="circle"
              wrapperStyle={{ paddingBottom: "20px" }}
              formatter={(value) => (
                <span className="text-[#718EBF] capitalize ml-1">{value}</span>
              )}
            />
            {/* Increased barSize for better visibility on wide screens */}
            <Bar
              dataKey="debit"
              name="Debit"
              fill="#1814F3"
              radius={[10, 10, 10, 10]}
              barSize={20}
            />
            <Bar
              dataKey="credit"
              name="Credit"
              fill="#FF82AC"
              radius={[10, 10, 10, 10]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};