"use client";
import { useRef } from "react";
import { CardList } from "@/components/dashboard/cards/CardList";
import { AddNewCardForm } from "@/components/dashboard/cards/AddNewCardForm";
import { CardExpenseStats } from "@/components/dashboard/cards/CardExpenseStats";
import { useCards } from "@/hooks/useCards";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CreditCard } from "@/components/dashboard/cards/CreditCard";

const MyCardsCarousel = () => {
  const { data: cards, isLoading } = useCards();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading)
    return <div className="h-52.5 w-full bg-gray-200 rounded-[2rem] animate-pulse" />;

  if (!cards || cards.length === 0) return null;

  return (
    <div className="relative group">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 bg-white border border-gray-100 shadow-xl rounded-full p-3 hidden md:group-hover:flex items-center justify-center text-gray-500 hover:text-[#2D60FF] hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>

        {cards.map((card, index) => (
          <CreditCard
            key={card.id}
            card={card}
            className="min-w-[320px] h-52.5 shrink-0"
          />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white border border-gray-100 shadow-xl rounded-full p-3 hidden md:group-hover:flex items-center justify-center text-gray-500 hover:text-[#2D60FF] hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
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