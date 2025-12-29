"use client";
import Image from "next/image";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface CreditCardProps {
    card: any;
    variant?: "blue" | "white";
    className?: string;
}

export const CreditCard = ({ card, variant = "blue", className }: CreditCardProps) => {
    const isBlue = variant === "blue";

    // Determine Logo based on provider
    const logoSrc = card.cardProvider === "visa" ? "/icons/visa.png" : "/icons/mastercard.png";

    return (
        <div
            className={cn(
                "rounded-[2rem] p-6 relative flex flex-col justify-between overflow-hidden shadow-sm transition-transform hover:scale-[1.02]",
                isBlue
                    ? "bg-linear-to-r from-[#2D60FF] to-[#539BFF] text-white"
                    : "bg-white border border-gray-100 text-[#343C6A]",
                className
            )}
        >
            {/* Top Row: Balance & Chip */}
            <div className="flex justify-between items-start">
                <div>
                    <p className={`text-xs ${isBlue ? "opacity-80" : "text-gray-500"}`}>
                        Balance
                    </p>
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
                        className={`object-contain ${!isBlue && "invert opacity-50"}`}
                    />
                </div>
            </div>

            {/* Middle Row: Details */}
            <div className="flex justify-between items-end gap-8">
                <div>
                    <p className={`text-[10px] uppercase tracking-wider mb-1 ${isBlue ? "opacity-70" : "text-gray-400"}`}>
                        Card Holder
                    </p>
                    <p className="font-medium text-sm truncate max-w-[120px]">
                        {card.cardHolder}
                    </p>
                </div>
                <div>
                    <p className={`text-[10px] uppercase tracking-wider mb-1 ${isBlue ? "opacity-70" : "text-gray-400"}`}>
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