"use client";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileHeader } from "@/components/dashboard/MobileHeader";
import Image from "next/image";
import { AccountStatusBanner } from "@/components/dashboard/AccountStatusBanner";
import { useDashboardStore } from "@/store/useDashboardStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pageTitle } = useDashboardStore();

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen flex flex-col">
        {/* Desktop Header (Hidden on Mobile) */}
        <header className="hidden md:flex justify-between items-center py-6 px-10 bg-white border-b mb-8">
          {/* Dynamic Page Title */}
          <h1 className="text-2xl font-bold text-[#343C6A]">{pageTitle}</h1>

          <div className="flex items-center gap-4">
            {/* Search Bar & Profile Pic */}
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/avatars/user.jpg"
                alt="Profile"
                width={40}
                height={40}
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-10">
          {/* Mobile "Pill" Header (Visible only on Mobile) */}
          <MobileHeader />
          <AccountStatusBanner />
          {children}
        </main>
      </div>
    </div>
  );
}