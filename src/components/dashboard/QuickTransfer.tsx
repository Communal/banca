"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const users = [
  { name: "Livia Bator", role: "CEO", img: "/avatars/1.jpg" },
  { name: "Randy Press", role: "Director", img: "/avatars/2.jpg" },
  { name: "Workman", role: "Designer", img: "/avatars/3.jpg" },
  { name: "Kevin", role: "CEO", img: "/avatars/4.jpg" },
];

export const QuickTransfer = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [amount, setAmount] = useState("525.50");

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[350px] flex flex-col justify-between">
      <h3 className="text-lg font-bold text-brand-primary">Quick Transfer</h3>

      {/* Users Carousel */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
        {users.map((user, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedUser(idx)}
            className={`flex flex-col items-center gap-2 min-w-[80px] cursor-pointer transition-all ${
              selectedUser === idx ? "font-bold" : "opacity-70"
            }`}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden relative">
              <Image
                src={user.img}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-brand-primary">{user.name}</p>
              <p className="text-xs text-brand-accent">{user.role}</p>
            </div>
          </div>
        ))}
        <button className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Input Action */}
      <div className="flex items-center gap-4 mt-4">
        <span className="text-gray-500 text-sm whitespace-nowrap">
          Write Amount
        </span>
        <div className="flex-1 relative">
          <div className="absolute left-0 top-0 h-full w-full bg-gray-100 rounded-full flex items-center pl-6 pr-32">
            <span className="font-bold text-brand-primary">{amount}</span>
          </div>
          <Button className="absolute right-0 top-0 h-full rounded-full px-6 bg-brand-primary hover:bg-blue-700">
            Send <Send size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
