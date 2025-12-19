"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Careers", href: "/careers" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Security", href: "/security" },
  ];

  const isActiveLink = (path: string) => pathname === path;

  // Helper to close menu when a link is clicked (for mobile)
  const handleMobileLinkClick = () => setIsOpen(false);

  return (
    <div className="w-full fixed top-6 z-50 px-4">
      <nav className="mx-auto max-w-7xl bg-gray-100/80 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center justify-between shadow-sm">
        {/* --- LOGO SECTION --- */}
        <div className="flex items-center gap-2">
          <div className="bg-brand-accent text-white p-1 rounded-sm flex items-center justify-center">
            <div className="w-6 h-6 relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white"></div>
              <div className="absolute inset-0 m-auto w-2 h-2 bg-white rotate-45"></div>
            </div>
          </div>
          <span className="font-bold text-xl text-brand-primary tracking-tight">
            YourBanK
          </span>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-accent text-white shadow-md"
                    : "text-gray-600 hover:text-brand-accent hover:bg-white/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* --- DESKTOP ACTIONS --- */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/signup"
            className="font-medium text-gray-700 hover:text-brand-accent"
          >
            Sign Up
          </Link>
          {/* FIX: Wrapped Button in Link */}
          <Link href="/login">
            <Button className="rounded-full bg-brand-accent hover:bg-blue-700 text-white px-8 py-5 font-medium text-base">
              Login
            </Button>
          </Link>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <div className="md:hidden">
          <Button
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full bg-brand-accent hover:bg-blue-700 text-white w-12 h-12"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </nav>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full px-4 mt-2 md:hidden">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col gap-4 animate-in slide-in-from-top-5">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleMobileLinkClick}
                  className={`text-lg font-medium p-2 rounded-lg ${
                    isActive
                      ? "text-brand-accent bg-brand-light"
                      : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <hr className="border-gray-100" />
            <div className="flex flex-col gap-3">
              {/* FIX: Added onClick to close menu */}
              <Link href="/signup" onClick={handleMobileLinkClick}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/login" onClick={handleMobileLinkClick}>
                <Button className="w-full rounded-full bg-brand-accent py-6 text-lg">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
