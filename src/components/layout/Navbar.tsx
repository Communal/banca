"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Security", href: "/security" },
    { name: "Careers", href: "/careers" },
  ];

  const isActiveLink = (path: string) => pathname === path;
  const handleMobileLinkClick = () => setIsOpen(false);

  return (
    <div className="w-full fixed top-6 z-50 px-4">
      <nav className="mx-auto max-w-7xl bg-gray-100/80 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center justify-between shadow-sm">
        {/* --- LOGO SECTION --- */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/web.png"
            alt="Montedeiazzu Desktop Logo"
            width={150}
            height={80}
            className="hidden md:block object-contain"
            priority
          />
          <Image
            src="/images/wb2.png"
            alt="Montedeiazzu Mobile Logo"
            width={40}
            height={40}
            className="block md:hidden object-contain"
            priority
          />
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
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
        <div className="hidden md:flex items-center gap-4">
          {/* Translator Added Here */}
          {/* <LanguageSwitcher /> */}

          <div className="h-6 w-px bg-gray-300 mx-2" /> {/* Divider */}

          <Link
            href="/signup"
            className="font-medium text-gray-700 hover:text-brand-accent"
          >
            Sign Up
          </Link>
          <Link href="/login">
            <Button className="rounded-full bg-brand-accent hover:bg-blue-700 text-white px-8 py-5 font-medium text-base">
              Login
            </Button>
          </Link>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <div className="md:hidden flex items-center gap-3">
          {/* Optional: Show translator icon on mobile header too? 
               For now, keeping it in the menu to save space. */}
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
                  className={`text-lg font-medium p-2 rounded-lg ${isActive
                      ? "text-brand-accent bg-brand-light"
                      : "text-gray-600"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <hr className="border-gray-100" />

            {/* Mobile Actions */}
            <div className="flex flex-col gap-3">
              {/* Translator in Mobile Menu */}
              <div className="flex justify-start py-2">
                {/* <LanguageSwitcher /> */}
              </div>

              <Link href="/signup" onClick={handleMobileLinkClick}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg px-0 hover:bg-transparent hover:text-brand-accent"
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