"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Banknote,
  Wrench,
  Settings,
  LogOut,
} from "lucide-react";
import { useLogout } from "@/hooks/useLogout";

interface AdminSidebarProps {
  isOpen: boolean;
  closeMobileMenu: () => void;
}

export const AdminSidebar = ({
  isOpen,
  closeMobileMenu,
}: AdminSidebarProps) => {
  const pathname = usePathname();
  const logout = useLogout();

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/accounts", label: "Edit Accounts", icon: Users },
    {
      href: "/admin/transactions",
      label: "Edit Transactions",
      icon: CreditCard,
    },
    { href: "/admin/loans", label: "Loans", icon: Banknote },
    { href: "/admin/services", label: "Services", icon: Wrench },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-100 transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-gray-50 md:border-none">
          <div className="flex items-center gap-2 text-[#343C6A] font-extrabold text-2xl tracking-tight">
            <div className="bg-[#2D60FF] text-white p-1 rounded-sm w-7 h-7 flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-white rotate-45"></div>
            </div>
            YourBanK
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#2D60FF] text-white shadow-md shadow-blue-200"
                    : "text-[#B1B1B1] hover:bg-gray-50 hover:text-[#2D60FF]"
                )}
              >
                <Icon
                  size={22}
                  className={cn(
                    isActive
                      ? "text-white"
                      : "text-[#B1B1B1] group-hover:text-[#2D60FF]"
                  )}
                />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-50">
          <button
            onClick={() => logout.mutate()}
            className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-[#B1B1B1] hover:bg-red-50 hover:text-red-500 w-full transition-colors"
          >
            <LogOut size={22} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};
