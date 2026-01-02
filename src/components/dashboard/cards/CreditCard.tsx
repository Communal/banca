"use client";
import Image from "next/image";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface CreditCardProps {
    card: any;
    className?: string;
}

export const CreditCard = ({ card, className }: CreditCardProps) => {
    // 1. Determine Theme based on provider
    const isMastercard = card.cardProvider === "mastercard";
    const isVisa = card.cardProvider === "visa";

    // Default to Blue (Visa) if unknown, or switch based on logic
    const themeClasses = isMastercard
        ? "bg-linear-to-r from-[#5B5A6F] to-[#000000] text-white" // Black Theme
        : "bg-linear-to-r from-[#2D60FF] to-[#539BFF] text-white"; // Blue Theme

    const logoSrc = isVisa ? "/icons/visa.png" : "/icons/mastercard.png";

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
                        {formatCurrency(card.balance, card.currency)}
                    </p>
                </div>
                {/* Chip Image */}
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

            {/* Middle Row: Details */}
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
                    <p className="font-medium text-sm">{card.validThru}</p>
                </div>
            </div>

            {/* Bottom Row: Number & Logo */}
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