"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CreditCard, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function EditUserCards({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Unwrap
  const { data, isLoading } = useQuery({
    queryKey: ["admin-user",id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${id}`);
      return res.json();
    },
  });

  const handleDelete = async (cardId: string) => {
    if (!confirm("Are you sure?")) return;
    // Add API call here to delete card
    toast.info("Delete functionality would go here");
  };

  if (isLoading)
    return <div className="animate-pulse h-96 bg-gray-50 rounded-xl" />;

  const cards = data?.cards || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#343C6A] text-xl font-bold">Card List</h3>
        <Button className="bg-[#1814F3] hover:bg-blue-700 rounded-xl px-6 h-10">
          Add New
        </Button>
      </div>

      <div className="grid gap-4">
        {cards.map((card: any) => (
          <div
            key={card.id}
            className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-100 rounded-2xl gap-4 hover:shadow-sm transition-shadow"
          >
            {/* Icon + Type */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 bg-[#E7EDFF] rounded-xl flex items-center justify-center text-[#1814F3]">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-[#343C6A] font-bold text-sm">Card Type</p>
                <p className="text-[#718EBF] text-sm capitalize">
                  {card.cardType || "Secondary"}
                </p>
              </div>
            </div>

            {/* Bank */}
            <div className="w-full md:w-auto">
              <p className="text-[#343C6A] font-bold text-sm">Bank</p>
              <p className="text-[#718EBF] text-sm">
                {card.bankName || "DBL Bank"}
              </p>
            </div>

            {/* Number */}
            <div className="w-full md:w-auto">
              <p className="text-[#343C6A] font-bold text-sm">Card Number</p>
              <p className="text-[#718EBF] text-sm">
                **** **** {card.lastFourDigits}
              </p>
            </div>

            {/* Name */}
            <div className="w-full md:w-auto">
              <p className="text-[#343C6A] font-bold text-sm">Namain Card</p>
              <p className="text-[#718EBF] text-sm">{card.cardHolder}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full md:w-auto justify-end">
              <button className="text-[#1814F3] text-sm font-medium hover:underline">
                Edit Details
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="text-[#FE5C73] border border-[#FE5C73] px-4 py-2 rounded-full text-xs font-medium hover:bg-red-50 transition-colors"
              >
                Delete Card
              </button>
            </div>
          </div>
        ))}
        {cards.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            No cards found for this user.
          </p>
        )}
      </div>
    </div>
  );
}
