"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Lexend } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const lexend = Lexend({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Helper to determine title based on path
  const getTitle = () => {
    if (pathname.includes("/dashboard")) return "Dashboard";
    if (pathname.includes("/accounts")) return "Accounts";
    if (pathname.includes("/transactions")) return "Transactions";
    if (pathname.includes("/loans")) return "Loans";
    if (pathname.includes("/services")) return "Services";
    if (pathname.includes("/settings")) return "Settings";
    return "Overview";
  };

  return (
    <div className={`${lexend.className} min-h-screen bg-[#F5F7FA] flex`}>
      <Toaster position="top-right" richColors />

      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        closeMobileMenu={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
          title={getTitle()}
        />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
