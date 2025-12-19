"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// --- HOOK ---
const useAdminData = () => {
  return useQuery({
    queryKey: ["admin-data"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
  });
};

export default function AdminDashboard() {
  const { data, isLoading } = useAdminData();

  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-500">
        Loading admin portal...
      </div>
    );

  const { users, stats } = data || {
    users: [],
    stats: { totalAccounts: 0, totalTransactions: 0 },
  };

  return (
    <div className="space-y-6">
      {/* 1. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full text-[#2D60FF]">
              <Users size={30} />
            </div>
            <div>
              <p className="text-[#718EBF] text-sm font-medium">
                Total Accounts
              </p>
              <p className="text-[#232323] text-3xl font-bold">
                {stats.totalAccounts}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-4 rounded-full text-[#FFBB38]">
              <FileText size={30} />
            </div>
            <div>
              <p className="text-[#718EBF] text-sm font-medium">
                Total Transactions
              </p>
              <p className="text-[#232323] text-3xl font-bold">
                {stats.totalTransactions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. All Accounts Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#343C6A] text-lg font-bold">All Accounts</h2>
          <Link href="/admin/users/add">
            <Button className="bg-[#1814F3] hover:bg-blue-700 rounded-xl px-6 h-10 text-sm">
              + Add New User
            </Button>
          </Link>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#718EBF] text-sm border-b border-gray-100">
                <th className="font-medium py-3">Name</th>
                <th className="font-medium py-3">Email</th>
                <th className="font-medium py-3">Password</th>
                <th className="font-medium py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[#232323] text-sm">
              {users.map((user: any) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-50 last:border-none hover:bg-gray-50/50"
                >
                  <td className="py-4 flex items-center gap-3">
                    <Image
                      src={user.avatarUrl || "/avatars/default.jpg"}
                      alt={user.fullName}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="font-medium">{user.fullName}</span>
                  </td>
                  <td className="py-4 text-gray-500">{user.email}</td>
                  <td className="py-4 font-mono text-gray-500">
                    {user.viewPassword || "••••••••"}
                  </td>
                  {/* Dummy as per design */}
                  <td className="py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/users/${user.id}`}>
                        <button className="text-[#1814F3] border border-[#1814F3] px-4 py-1.5 rounded-full text-xs hover:bg-blue-50 transition-colors">
                          Edit Details
                        </button>
                      </Link>
                      <button className="text-[#FE5C73] border border-[#FE5C73] px-4 py-1.5 rounded-full text-xs hover:bg-red-50 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards List */}
        <div className="md:hidden flex flex-col gap-4">
          {users.map((user: any) => (
            <div
              key={user.id}
              className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={user.avatarUrl || "/avatars/default.jpg"}
                  alt={user.fullName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-[#232323]">Full Name :</span>
                <span className="text-gray-600">{user.fullName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-[#232323]">Email :</span>
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-[#232323]">Password :</span>
                <span className="text-gray-600">1234444311</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <Link href={`/admin/users/${user.id}`} className="w-full">
                  <button className="w-full text-[#1814F3] border border-[#1814F3] px-4 py-2 rounded-full text-xs font-medium text-center">
                    Edit
                  </button>
                </Link>
                <button className="text-[#FE5C73] border border-[#FE5C73] px-4 py-2 rounded-full text-xs font-medium text-center">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
