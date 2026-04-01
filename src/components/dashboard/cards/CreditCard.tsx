"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface CreditCardProps {
    card: any;
    className?: string;
}

export const CreditCard = ({ card, className }: CreditCardProps) => {
    const { data: authData, isLoading: isUserLoading } = useCurrentUser();
    const user = authData?.user || authData;

    // Safety fallback
    if (!card) return null;

    // Skeleton while loading user (currency depends on it)
    if (isUserLoading) {
        return (
            <div className={cn("rounded-[2rem] bg-gray-200 animate-pulse h-48", className)} />
        );
    }

    const isMastercard = card.cardProvider === "mastercard";
    const isVisa = card.cardProvider === "visa";

    const themeClasses = isMastercard
        ? "bg-linear-to-r from-[#5B5A6F] to-[#000000] text-white"
        : "bg-linear-to-r from-[#2D60FF] to-[#539BFF] text-white";

    const logoSrc = isVisa ? "/icons/visa.png" : "/icons/mastercard.png";

    // ✅ FIX: Use user's currency as single source of truth
    const currencyCode = user?.currency || "USD";

    const balance = Number(card.balance || 0);

    return (
        <div
            className={cn(
                "rounded-[2rem] p-6 relative flex flex-col justify-between overflow-hidden shadow-sm transition-transform hover:scale-[1.02]",
                themeClasses,
                className
            )}
        >
            {/* Top Row: Balance & Chip */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs opacity-80">Balance</p>
                    <p className="text-2xl font-semibold mt-1">
                        {formatCurrency(balance, currencyCode)}
                    </p>
                </div>

                {/* Chip */}
                <div className="relative w-10 h-10">
                    <Image
                        src="/images/chip-card.png"
                        alt="Chip"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Middle Row */}
            <div className="flex justify-between items-end gap-8">
                <div>
                    <p className="text-[10px] uppercase tracking-wider mb-1 opacity-70">
                        Card Holder
                    </p>
                    <p className="font-medium text-sm truncate max-w-30">
                        {card.cardHolder}
                    </p>
                </div>

                <div>
                    <p className="text-[10px] uppercase tracking-wider mb-1 opacity-70">
                        Valid Thru
                    </p>
                    <p className="font-medium text-sm">
                        {card.validThru}
                    </p>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-center mt-2">
                <p className="font-mono text-xl tracking-widest">
                    **** **** **** {card.lastFourDigits}
                </p>

                <div className="relative w-12 h-8">
                    <Image
                        src={logoSrc}
                        alt={card.cardProvider}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};