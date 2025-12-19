"use client";
import { useState } from "react";
import { useCards } from "@/hooks/useCards";
import { CardDetailsDialog } from "./CardDetailsDialog";
import { CreditCard } from "lucide-react";

export const CardList = () => {
  const { data: cards, isLoading, isError } = useCards();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-white rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Failed to load cards. Please try again.
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl text-center text-gray-500">
        No cards found. Add a new card to get started.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* 1. Icon & Type */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  card.cardType === "secondary"
                    ? "bg-pink-100 text-pink-500"
                    : card.cardType === "primary"
                    ? "bg-blue-100 text-blue-500"
                    : "bg-yellow-100 text-yellow-500"
                }`}
              >
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Card Type</p>
                <p className="font-bold text-[#343C6A] capitalize">
                  {card.cardType}
                </p>
              </div>
            </div>

            {/* 2. Bank */}
            <div className="w-full md:w-auto">
              <p className="text-sm text-gray-500">Bank</p>
              <p className="font-bold text-[#343C6A]">{card.bankName}</p>
            </div>

            {/* 3. Card Number */}
            <div className="w-full md:w-auto">
              <p className="text-sm text-gray-500">Card Number</p>
              <p className="font-bold text-[#343C6A]">
                **** **** {card.lastFourDigits}
              </p>
            </div>

            {/* 4. Name */}
            <div className="w-full md:w-auto">
              <p className="text-sm text-gray-500">Namain Card</p>
              <p className="font-bold text-[#343C6A]">{card.cardHolder}</p>
            </div>

            {/* 5. Action */}
            <div className="w-full md:w-auto text-right">
              <button
                onClick={() => setSelectedCardId(card.id)}
                className="text-[#1814F3] font-medium text-sm hover:underline"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <CardDetailsDialog
        isOpen={!!selectedCardId}
        cardId={selectedCardId}
        onClose={() => setSelectedCardId(null)}
      />
    </>
  );
};
