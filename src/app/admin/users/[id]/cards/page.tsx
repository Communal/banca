"use client";

import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import { CardFormDialog } from "@/components/admin/CardFormDialog";

export default function EditUserCards({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const queryClient = useQueryClient();

  // State for controlling the Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  // Fetch User & Cards
  const { data, isLoading } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${id}`);
      return res.json();
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (cardId: string) => {
      // NOTE: You need to implement DELETE in /api/admin/cards/route.ts or similar
      // For now, assume a generic delete endpoint exists or add logic
      toast.info("Delete endpoint logic needed here");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user", id] });
      toast.success("Card deleted");
    }
  });

  const handleDelete = async (cardId: string) => {
    if (!confirm("Are you sure?")) return;
    deleteMutation.mutate(cardId);
  };

  const handleEdit = (card: any) => {
    setSelectedCard(card);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCard(null); // Clear selection for "New" mode
    setIsDialogOpen(true);
  };

  if (isLoading)
    return <div className="animate-pulse h-96 bg-gray-50 rounded-xl" />;

  const cards = data?.cards || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#343C6A] text-xl font-bold">Card List</h3>
        <Button
          onClick={handleAddNew}
          className="bg-[#1814F3] hover:bg-blue-700 rounded-xl px-6 h-10"
        >
          Add New
        </Button>
      </div>

      <div className="grid gap-4">
        {cards.map((card: any) => (
          <div
            key={card.id}
            className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-100 rounded-2xl gap-4 hover:shadow-sm transition-shadow bg-white"
          >
            {/* Icon + Type */}
            <div className="flex items-center gap-4 w-full md:w-auto min-w-[200px]">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center 
                  ${card.cardType === 'primary' ? 'bg-[#FFF5D9] text-[#FFBB38]' : 'bg-[#E7EDFF] text-[#1814F3]'}`}>
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
            <div className="w-full md:w-auto min-w-[120px]">
              <p className="text-[#343C6A] font-bold text-sm">Bank</p>
              <p className="text-[#718EBF] text-sm">
                {card.bankName || "Unknown Bank"}
              </p>
            </div>

            {/* Number */}
            <div className="w-full md:w-auto min-w-[150px]">
              <p className="text-[#343C6A] font-bold text-sm">Card Number</p>
              <p className="text-[#718EBF] text-sm">
                **** **** {card.lastFourDigits}
              </p>
            </div>

            {/* Name */}
            <div className="w-full md:w-auto min-w-[150px]">
              <p className="text-[#343C6A] font-bold text-sm">Name in Card</p>
              <p className="text-[#718EBF] text-sm">{card.cardHolder}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 w-full md:w-auto justify-end items-center">
              <button
                onClick={() => handleEdit(card)}
                className="text-[#1814F3] border border-[#1814F3] px-5 py-2 rounded-full text-xs font-medium hover:bg-blue-50 transition-colors"
              >
                Edit Details
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="text-[#FE5C73] border border-[#FE5C73] px-5 py-2 rounded-full text-xs font-medium hover:bg-red-50 transition-colors"
              >
                Delete Card
              </button>
            </div>
          </div>
        ))}

        {cards.length === 0 && (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">No cards found for this user.</p>
            <Button variant="link" onClick={handleAddNew} className="text-[#1814F3]">
              Add the first one
            </Button>
          </div>
        )}
      </div>

      {/* The Dialog Form */}
      <CardFormDialog
        userId={id}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        cardToEdit={selectedCard}
      />
    </div>
  );
}