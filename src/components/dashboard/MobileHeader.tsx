"use client";
import { Menu, User } from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";

export const MobileHeader = () => {
  const { toggleMobileMenu, pageTitle } = useDashboardStore();

  return (
    <div className="md:hidden mb-8">
      <div className="bg-gray-100 rounded-full p-2 flex items-center justify-between shadow-sm border border-white">

        {/* Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="w-12 h-12 bg-[#2D60FF] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
        >
          <Menu size={24} />
        </button>

        {/* Page Title */}
        <h1 className="text-xl font-bold text-[#343C6A]">
          {pageTitle}
        </h1>

        {/* Default Profile Icon */}
        <div className="w-12 h-12 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center">
          <User className="text-[#718EBF]" size={22} />
        </div>

      </div>
    </div>
  );
};
