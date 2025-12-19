"use client";
import { Menu } from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";

export const MobileHeader = () => {
  const { toggleMobileMenu, pageTitle } = useDashboardStore();

  return (
    <div className="md:hidden mb-8">
      <div className="bg-gray-100 rounded-full p-2 flex items-center justify-between shadow-sm border border-white">
        
        {/* Hamburger Button (Blue Circle) */}
        <button 
          onClick={toggleMobileMenu}
          className="w-12 h-12 bg-[#2D60FF] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
        >
          <Menu size={24} />
        </button>

        {/* Page Title */}
        <h1 className="text-xl font-bold text-[#343C6A]">{pageTitle}</h1>

        {/* User Profile (Circle) */}
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
           <img src="/avatars/user.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>

      </div>
    </div>
  );
};