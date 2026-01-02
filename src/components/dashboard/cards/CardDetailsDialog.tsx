"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCardDetails } from "@/hooks/useCards";
import Image from "next/image";
import { formatCurrency } from "@/lib/currency";

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

  const isMastercard = card?.cardProvider === 'mastercard';
  const logoSrc = isMastercard ? '/icons/mastercard.png' : '/icons/visa.png';

  // Apply same logic: Blue for Visa, Black for Mastercard
  const bgClasses = isMastercard
    ? "bg-linear-to-r from-[#5B5A6F] to-[#000000]"
    : "bg-linear-to-r from-[#2D60FF] to-[#539BFF]";

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

            {/* Dynamic Card Visual */}
            <div className={`${bgClasses} p-6 rounded-[2rem] text-white shadow-lg relative overflow-hidden`}>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-xs opacity-80">Balance</p>
                  <p className="text-2xl font-semibold">
                    {formatCurrency(card.balance, card.currency)}
                  </p>
                </div>
                {/* Chip Image */}
                <Image
                  src="/images/chip-card.png"
                  alt="Chip"
                  width={40}
                  height={40}
                  className="opacity-90"
                />
              </div>

              <div className="flex justify-between items-end gap-8">
                <div>
                  <p className="text-xs opacity-80 uppercase mb-1">Card Holder</p>
                  <p className="text-sm font-medium">{card.cardHolder}</p>
                </div>
                <div>
                  <p className="text-xs opacity-80 uppercase mb-1">Valid Thru</p>
                  <p className="text-sm font-medium">{card.validThru}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <p className="font-mono text-xl tracking-widest">
                  {card.cardNumber}
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
                <span className="text-gray-500 text-sm">Currency</span>
                <span className="font-medium text-[#343C6A]">
                  {card.currency}
                </span>
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
                      {tx.amount > 0 ? "+" : ""}
                      {formatCurrency(tx.amount, card.currency)}
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