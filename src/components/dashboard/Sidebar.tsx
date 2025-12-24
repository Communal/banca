"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDashboardStore } from "@/store/useDashboardStore";
import {
  Home,
  CreditCard,
  User,
  Settings,
  PieChart,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Transactions", href: "/dashboard/transactions", icon: DollarSign },
  { name: "Accounts", href: "/dashboard/accounts", icon: User },
  { name: "Investments", href: "/dashboard/investments", icon: PieChart },
  { name: "Credit Cards", href: "/dashboard/cards", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useDashboardStore();

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-white border-r z-50 transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Area */}
        <div className="flex items-center gap-2 p-8 mb-4">
          <Image
            src="/images/web.png"
            alt="Montedeiazzu Desktop Logo"
            width={220}
            height={200}
            className="hidden md:block object-contain"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-medium transition-colors relative",
                  isActive
                    ? "text-[#2D60FF]"
                    : "text-[#B1B1B1] hover:text-[#2D60FF] hover:bg-gray-50"
                )}
              >
                {/* Active Indicator Border */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2D60FF] rounded-r-md" />
                )}
                <link.icon
                  className={cn("w-6 h-6", isActive ? "fill-current" : "")}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
