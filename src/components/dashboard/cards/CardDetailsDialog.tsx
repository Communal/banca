"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCardDetails } from "@/hooks/useCards";
import Image from "next/image";

interface CardDetailsDialogProps {
  cardId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CardDetailsDialog = ({
  cardId,
  isOpen,
  onClose,
}: CardDetailsDialogProps) => {
  const { data: card, isLoading } = useCardDetails(cardId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-[#343C6A] text-xl font-bold">
            Card Details
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="h-40 animate-pulse bg-gray-100 rounded-xl" />
        ) : card ? (
          <div className="space-y-6">
            {/* Visual Representation */}
            <div className="bg-linear-to-r from-[#2D60FF] to-[#539BFF] p-6 rounded-2xl text-white shadow-lg">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-xs opacity-80">Balance</p>
                  <p className="text-xl font-semibold">${card.balance}</p>
                </div>
                <Image
                  src="/icons/chip-card.png"
                  alt="Chip"
                  width={32}
                  height={32}
                  className="opacity-80"
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-80 uppercase">Card Holder</p>
                  <p className="text-sm font-medium">{card.cardHolder}</p>
                </div>
                <div>
                  <p className="text-xs opacity-80 uppercase">Valid Thru</p>
                  <p className="text-sm font-medium">{card.validThru}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="font-mono text-lg tracking-widest">
                  **** **** **** {card.lastFourDigits}
                </p>
                <div className="opacity-80">
                  {/* Master/Visa Icon */}
                  <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* Details List */}
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-sm">Bank Name</span>
                <span className="font-medium text-[#343C6A]">
                  {card.bankName}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-sm">Card Type</span>
                <span className="font-medium text-[#343C6A] capitalize">
                  {card.cardType}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-sm">Status</span>
                <span className="font-medium text-green-500">Active</span>
              </div>
            </div>

            {/* Recent Transactions Snippet */}
            <div>
              <h4 className="font-bold text-[#343C6A] mb-3 text-sm">
                Recent Activity
              </h4>
              <div className="space-y-3">
                {card.transactions?.length === 0 && (
                  <p className="text-xs text-gray-400">
                    No recent transactions.
                  </p>
                )}
                {card.transactions?.map((tx: any) => (
                  <div key={tx.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{tx.description}</span>
                    <span
                      className={
                        tx.amount < 0 ? "text-red-500" : "text-green-500"
                      }
                    >
                      {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-500">Failed to load card details.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
