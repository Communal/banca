"use client";
import { useRef } from "react";
import { CardList } from "@/components/dashboard/cards/CardList";
import { AddNewCardForm } from "@/components/dashboard/cards/AddNewCardForm";
import { CardExpenseStats } from "@/components/dashboard/cards/CardExpenseStats";
import { useCards } from "@/hooks/useCards";
import { formatCurrency } from "@/lib/currency";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import Icons

const MyCardsCarousel = () => {
  const { data: cards, isLoading } = useCards();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll Handler
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Card width (320px) + gap (24px)
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading)
    return (
      <div className="h-[210px] w-full bg-gray-200 rounded-[2rem] animate-pulse" />
    );

  if (!cards || cards.length === 0) return null;

  return (
    <div className="relative group">
      {/* --- Left Navigation Button (Visible on Hover) --- */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 bg-white border border-gray-100 shadow-xl rounded-full p-3 hidden md:group-hover:flex items-center justify-center text-gray-500 hover:text-[#2D60FF] hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Scroll Left"
      >
        <ChevronLeft size={20} />
      </button>

      {/* --- Scroll Container --- */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-2 scroll-smooth"
        // INLINE STYLES to forcibly hide scrollbar across all browsers
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {/* Webkit Scrollbar Hide (Chrome/Safari) */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {cards.map((card, index) => {
          const isBlue = index % 2 === 0;
          const logoSrc =
            card.cardProvider === "visa"
              ? "/icons/visa.png"
              : "/icons/mastercard.png";

          return (
            <div
              key={card.id}
              className={`min-w-[320px] h-[210px] rounded-[2rem] p-6 relative flex flex-col justify-between shrink-0 transition-transform hover:scale-[1.02] overflow-hidden shadow-sm ${isBlue
                  ? "bg-linear-to-r from-[#2D60FF] to-[#539BFF] text-white"
                  : "bg-white border border-gray-100 text-[#343C6A]"
                }`}
            >
              {/* Top Row: Balance & Chip */}
              <div className="flex justify-between items-start">
                <div>
                  <p
                    className={`text-xs ${isBlue ? "opacity-80" : "text-gray-500"
                      }`}
                  >
                    Balance
                  </p>
                  <p className="text-2xl font-semibold mt-1">
                    {formatCurrency(card.balance, card.currency)}
                  </p>
                </div>
                {/* Chip Image */}
                <div className="relative w-10 h-10">
                  <Image
                    src="/images/card-chip.png"
                    alt="Chip"
                    width={40}
                    height={40}
                    className={`object-contain ${!isBlue && "invert opacity-50"
                      }`}
                  />
                </div>
              </div>

              {/* Middle Row: Details */}
              <div className="flex justify-between items-end gap-8">
                <div>
                  <p
                    className={`text-[10px] uppercase tracking-wider mb-1 ${isBlue ? "opacity-70" : "text-gray-400"
                      }`}
                  >
                    Card Holder
                  </p>
                  <p className="font-medium text-sm truncate max-w-[120px]">
                    {card.cardHolder}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-[10px] uppercase tracking-wider mb-1 ${isBlue ? "opacity-70" : "text-gray-400"
                      }`}
                  >
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
        })}
      </div>

      {/* --- Right Navigation Button (Visible on Hover) --- */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white border border-gray-100 shadow-xl rounded-full p-3 hidden md:group-hover:flex items-center justify-center text-gray-500 hover:text-[#2D60FF] hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Scroll Right"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default function CreditCardsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-bold text-[#343C6A] mb-4">My Cards</h3>
        <MyCardsCarousel />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1">
          <CardExpenseStats />
        </div>
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-[#343C6A]">Card List</h3>
          <CardList />
        </div>
      </div>

      <div>
        <AddNewCardForm />
      </div>
    </div>
  );
}