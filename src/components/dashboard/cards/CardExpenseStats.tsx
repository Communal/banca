"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "DBL Bank", value: 30, color: "#4C78FF" }, // Blue
  { name: "BRC Bank", value: 25, color: "#FF82AC" }, // Pink
  { name: "ABM Bank", value: 20, color: "#16DBCC" }, // Teal
  { name: "MCP Bank", value: 25, color: "#FFBB38" }, // Orange
];

export const CardExpenseStats = () => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm h-[350px]">
      <h3 className="text-lg font-bold text-[#343C6A] mb-6">
        Card Expense Statistics
      </h3>

      <div className="flex items-center justify-center h-[70%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs md:text-sm text-[#718EBF] font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};