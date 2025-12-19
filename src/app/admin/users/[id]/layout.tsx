"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { use } from "react"; // Import use

export default function EditUserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>; // Change to Promise
}) {
  const { id } = use(params); // Unwrap with use()
  const pathname = usePathname();
  const baseUrl = `/admin/users/${id}`;

  const tabs = [
    { name: "Edit Profile", href: baseUrl },
    { name: "Cards", href: `${baseUrl}/cards` },
    { name: "Transactions", href: `${baseUrl}/transactions` },
  ];

  // ... rest of the component remains the same
  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 min-h-[85vh]">
      <div className="border-b border-gray-200 mb-8 flex gap-8 md:gap-12">
        {tabs.map((tab) => {
          const isActive =
            tab.href === baseUrl
              ? pathname === baseUrl
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "pb-3 text-sm md:text-base font-medium transition-colors relative px-2",
                isActive
                  ? "text-[#1814F3]"
                  : "text-[#718EBF] hover:text-[#343C6A]"
              )}
            >
              {tab.name}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1814F3] rounded-t-md" />
              )}
            </Link>
          );
        })}
      </div>
      <div className="animate-in fade-in duration-300">{children}</div>
    </div>
  );
}
