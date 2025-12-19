import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types matching your DB Schema
export interface Card {
  id: string;
  cardType: string;
  bankName: string;
  cardNumber: string; // Full number (masked in UI)
  lastFourDigits: string;
  cardHolder: string;
  validThru: string;
  balance: number;
  cardProvider: "visa" | "mastercard";
}

export interface CardWithTransactions extends Card {
  transactions: any[]; // define transaction type if needed
}

// --- Hooks ---

export const useCards = () => {
  return useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await fetch("/api/cards");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<Card[]>;
    },
  });
};

export const useCardDetails = (cardId: string | null) => {
  return useQuery({
    queryKey: ["card", cardId],
    queryFn: async () => {
      if (!cardId) return null;
      const res = await fetch(`/api/cards/${cardId}`);
      if (!res.ok) throw new Error("Failed to fetch details");
      return res.json() as Promise<CardWithTransactions>;
    },
    enabled: !!cardId, // Only fetch if an ID is selected
  });
};

export const useAddCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCard: any) => {
      const res = await fetch("/api/cards", {
        method: "POST",
        body: JSON.stringify(newCard),
      });
      if (!res.ok) throw new Error("Failed to add");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
