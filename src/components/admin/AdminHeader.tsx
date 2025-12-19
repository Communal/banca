"use client";

import { Menu, Search, Bell, Settings } from "lucide-react";
import Image from "next/image";

interface AdminHeaderProps {
  onMenuClick: () => void;
  title: string;
}

export const AdminHeader = ({ onMenuClick, title }: AdminHeaderProps) => {
  return (
    <header className="bg-white md:bg-transparent h-20 px-6 md:px-10 flex items-center justify-between border-b md:border-none border-gray-100 sticky top-0 z-30">
      {/* Mobile: Hamburger + Title */}
      <div className="flex items-center gap-4 md:hidden">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-[#343C6A] hover:bg-gray-100 rounded-full"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-[#343C6A]">{title}</h1>
      </div>

      {/* Desktop: Title */}
      <h1 className="hidden md:block text-2xl font-bold text-[#343C6A]">
        {title}
      </h1>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Search (Desktop Only) */}
        <div className="hidden md:flex items-center bg-[#F5F7FA] rounded-full px-5 py-3 w-64">
          <Search size={18} className="text-[#8BA3CB]" />
          <input
            type="text"
            placeholder="Search for something"
            className="bg-transparent border-none outline-none text-sm ml-3 text-[#718EBF] placeholder:text-[#8BA3CB] w-full"
          />
        </div>

        <button className="hidden md:flex bg-[#F5F7FA] p-3 rounded-full text-[#FE5C73] hover:bg-gray-100">
          <Settings size={20} />
        </button>
        <button className="hidden md:flex bg-[#F5F7FA] p-3 rounded-full text-[#FE5C73] hover:bg-gray-100">
          <Bell size={20} />
        </button>

        {/* Profile Pic */}
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-200">
          <Image
            src="https://i.pravatar.cc/150?u=admin"
            alt="Admin Profile"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
};
