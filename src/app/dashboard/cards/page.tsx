"use client";
import { CardList } from "@/components/dashboard/cards/CardList";
import { AddNewCardForm } from "@/components/dashboard/cards/AddNewCardForm";
import { CardExpenseStats } from "@/components/dashboard/cards/CardExpenseStats";
import { useCards } from "@/hooks/useCards";

const MyCardsCarousel = () => {
  const { data: cards, isLoading } = useCards();

  if (isLoading)
    return (
      <div className="h-[180px] w-full bg-gray-200 rounded-3xl animate-pulse" />
    );

  if (!cards || cards.length === 0) return null;

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
      {cards.map((card, index) => {
        const isBlue = index % 2 === 0; // Alternate styling like the design
        return (
          <div
            key={card.id}
            className={`min-w-[300px] h-[180px] rounded-3xl p-6 relative flex flex-col justify-between shrink-0 transition-transform hover:scale-[1.02] ${
              isBlue
                ? "bg-[#2D60FF] text-white"
                : "bg-white border border-gray-100 text-[#343C6A]"
            }`}
          >
            <div className="flex justify-between">
              <div>
                <p
                  className={`text-xs ${
                    isBlue ? "opacity-80" : "text-gray-500"
                  }`}
                >
                  Balance
                </p>
                <p className="text-xl font-semibold">
                  ${Number(card.balance).toLocaleString()}
                </p>
              </div>
              <div
                className={`w-8 h-8 rounded-md ${
                  isBlue ? "bg-white/20" : "bg-gray-800"
                }`}
              ></div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p
                  className={`text-xs uppercase ${
                    isBlue ? "opacity-80" : "text-gray-500"
                  }`}
                >
                  Card Holder
                </p>
                <p className="font-medium text-sm">{card.cardHolder}</p>
              </div>
              <div>
                <p
                  className={`text-xs uppercase ${
                    isBlue ? "opacity-80" : "text-gray-500"
                  }`}
                >
                  Valid Thru
                </p>
                <p className="font-medium text-sm">{card.validThru}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="font-mono text-lg">
                **** **** **** {card.lastFourDigits}
              </p>
              <div
                className={`w-8 h-5 rounded-sm ${
                  isBlue ? "bg-white/50" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function CreditCardsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Top Section: My Cards */}
      <div>
        <h3 className="text-lg font-bold text-[#343C6A] mb-4">My Cards</h3>
        <MyCardsCarousel />
      </div>

      {/* Middle Section: Stats & List */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1">
          <CardExpenseStats />
        </div>
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-[#343C6A]">Card List</h3>
          <CardList />
        </div>
      </div>

      {/* Bottom Section: Add Card Form */}
      <div>
        <AddNewCardForm />
      </div>
    </div>
  );
}
