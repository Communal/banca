"use client";

import { useState } from "react";
import { useCards } from "@/hooks/useCards";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { formatCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Send, Loader2, Ban } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MfaModal } from "@/components/MfaModal"; // <-- Import the new modal

export default function TransferPage() {
    // 1. Grab the loading state from React Query as well
    const { data: fetchedData, isLoading: isUserLoading } = useCurrentUser();
    const { data: cards } = useCards();

    const [isLoading, setIsLoading] = useState(false);
    const [isQueued, setIsQueued] = useState(false);

    const [showMfa, setShowMfa] = useState(false);

    const [formData, setFormData] = useState({
        cardId: "",
        accountNumber: "",
        bankName: "",
        recipientName: "",
        amount: "",
        note: "",
    });

    // 2. Safely extract the user (handles both direct objects and nested { user: {...} } objects)
    const user = fetchedData?.user || fetchedData;

    // 3. Update the logic: Only check status if the user actually exists
    const isActive = user?.status === "active";

    // 4. Disable if the transfer is processing, OR if the user is still being fetched, OR if we know for a fact they aren't active.
    const isDisabled = isLoading || isUserLoading || (user && !isActive);

    // --- STEP 1: Intercept the Submit ---
    const handleInitialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isActive) {
            toast.error("Transfer failed: Your account is not active");
            return;
        }

        if (!formData.cardId || !formData.amount) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Determine how many PINs are active for this specific user
        const activePins = [];
        if (user?.pinOneActive) activePins.push({ key: "pinOne", label: "Step 1" });
        if (user?.pinTwoActive) activePins.push({ key: "pinTwo", label: "Step 2" });
        if (user?.pinThreeActive) activePins.push({ key: "pinThree", label: "Step 3" });

        // If admin turned on PINs, show the modal. Otherwise, skip straight to transfer.
        if (activePins.length > 0) {
            setShowMfa(true);
        } else {
            executeTransfer({}); // Pass empty PINs object
        }
    };

    // --- STEP 2: Execute the API Call ---
    const executeTransfer = async (collectedPins: Record<string, string>) => {
        setIsLoading(true);

        try {
            const res = await fetch("/api/transactions/transfer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    cardId: formData.cardId,
                    amount: formData.amount,
                    description: formData.note,
                    bankName: formData.bankName,
                    accountNumber: formData.accountNumber,
                    recipientName: formData.recipientName,
                    pins: collectedPins, // Send the collected pins to the backend
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Transfer failed");
            }

            setShowMfa(false);
            setIsQueued(true);
            toast.success("Transfer successful!");

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setIsQueued(false);
        setFormData({
            cardId: "",
            accountNumber: "",
            bankName: "",
            recipientName: "",
            amount: "",
            note: "",
        });
    };

    // Calculate active pins to pass to the modal
    const getActivePins = () => {
        const pins = [];
        if (user?.pinOneActive) pins.push({ key: "pinOne", label: "Step 1" });
        if (user?.pinTwoActive) pins.push({ key: "pinTwo", label: "Step 2" });
        if (user?.pinThreeActive) pins.push({ key: "pinThree", label: "Step 3" });
        return pins;
    };

    if (isQueued) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white p-10 rounded-[2rem] shadow-sm text-center max-w-md w-full animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-[#E7EDFF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1814F3]">
                        <Send size={40} className="-ml-1 mt-1" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#343C6A] mb-2">
                        Transfer Queued
                    </h2>
                    <p className="text-[#718EBF] mb-8 leading-relaxed">
                        Your transfer of{" "}
                        <span className="font-bold text-[#343C6A]">
                            {formatCurrency(formData.amount, user?.currency)}
                        </span>{" "}
                        to <span className="font-bold text-[#343C6A]">{formData.recipientName}</span>{" "}
                        has been successfully queued and is being processed.
                    </p>
                    <Button
                        onClick={handleReset}
                        className="w-full h-12 rounded-xl bg-[#1814F3] hover:bg-blue-700 text-lg"
                    >
                        Make Another Transfer
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* MFA Modal Component */}
            <MfaModal
                isOpen={showMfa}
                onClose={() => setShowMfa(false)}
                activePins={getActivePins()}
                onComplete={executeTransfer}
                isProcessing={isLoading}
            />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#343C6A]">Quick Transfer</h1>
                <p className="text-[#718EBF] text-sm mt-1">
                    Send money instantly to other bank accounts.
                </p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm">
                <form onSubmit={handleInitialSubmit} className="space-y-8">

                    {/* Select Card */}
                    <div className="space-y-3">
                        <Label className="text-[#343C6A] font-medium text-base ml-1">
                            Select Card
                        </Label>
                        <Select
                            disabled={isDisabled}
                            value={formData.cardId}
                            onValueChange={(val) => setFormData({ ...formData, cardId: val })}
                        >
                            <SelectTrigger className="h-14 rounded-2xl bg-[#F7F9FC] border-transparent focus:border-[#1814F3] focus:ring-0 text-[#343C6A] text-base px-5">
                                <SelectValue placeholder="Select a funding source" />
                            </SelectTrigger>
                            <SelectContent>
                                {cards?.map((card) => (
                                    <SelectItem key={card.id} value={card.id}>
                                        {card.bankName} - ****{card.lastFourDigits} (
                                        {formatCurrency(card.balance, card.currency)})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Account Number */}
                    <div className="space-y-3">
                        <Label className="text-[#343C6A] font-medium text-base ml-1">
                            Account Number
                        </Label>
                        <Input
                            required
                            disabled={isDisabled}
                            placeholder="Enter account number"
                            className="h-14 rounded-2xl bg-[#F7F9FC] border-transparent focus-visible:ring-[#1814F3] text-[#343C6A] text-base px-5 placeholder:text-gray-400"
                            value={formData.accountNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, accountNumber: e.target.value })
                            }
                        />
                    </div>

                    {/* Bank Name */}
                    <div className="space-y-3">
                        <Label className="text-[#343C6A] font-medium text-base ml-1">
                            Bank Name
                        </Label>
                        <Input
                            required
                            disabled={isDisabled}
                            placeholder="Enter bank name"
                            className="h-14 rounded-2xl bg-[#F7F9FC] border-transparent focus-visible:ring-[#1814F3] text-[#343C6A] text-base px-5 placeholder:text-gray-400"
                            value={formData.bankName}
                            onChange={(e) =>
                                setFormData({ ...formData, bankName: e.target.value })
                            }
                        />
                    </div>

                    {/* Recipient Name */}
                    <div className="space-y-3">
                        <Label className="text-[#343C6A] font-medium text-base ml-1">
                            Recipient Name
                        </Label>
                        <Input
                            required
                            disabled={isDisabled}
                            placeholder="Enter recipient name"
                            className="h-14 rounded-2xl bg-[#F7F9FC] border-transparent focus-visible:ring-[#1814F3] text-[#343C6A] text-base px-5 placeholder:text-gray-400"
                            value={formData.recipientName}
                            onChange={(e) =>
                                setFormData({ ...formData, recipientName: e.target.value })
                            }
                        />
                    </div>

                    {/* Amount */}
                    <div className="space-y-3">
                        <Label className="text-[#343C6A] font-medium text-base ml-1">
                            Enter Amount
                        </Label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#343C6A] font-bold text-lg">
                                $
                            </span>
                            <Input
                                required
                                type="number"
                                disabled={isDisabled}
                                placeholder="0.00"
                                className="h-14 rounded-2xl bg-[#F7F9FC] border-transparent focus-visible:ring-[#1814F3] text-[#343C6A] text-lg font-bold pl-10 pr-5 placeholder:text-gray-400"
                                value={formData.amount}
                                onChange={(e) =>
                                    setFormData({ ...formData, amount: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Note */}
                    <div className="space-y-3">
                        <Label className="text-[#343C6A] font-medium text-base ml-1">
                            Add Note (Optional)
                        </Label>
                        <Textarea
                            disabled={isDisabled}
                            placeholder="Write a note..."
                            className="min-h-[120px] rounded-2xl bg-[#F7F9FC] border-transparent focus-visible:ring-[#1814F3] text-[#343C6A] text-base p-5 placeholder:text-gray-400 resize-none"
                            value={formData.note}
                            onChange={(e) =>
                                setFormData({ ...formData, note: e.target.value })
                            }
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex gap-4">
                        <Button
                            type="submit"
                            disabled={isDisabled}
                            className={cn(
                                "flex-1 h-14 rounded-2xl text-lg font-medium transition-all",
                                isDisabled
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                    : "bg-[#1814F3] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                            )}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" /> Processing...
                                </div>
                            ) : isDisabled ? (
                                <div className="flex items-center gap-2">
                                    <Ban size={20} /> Transfer Disabled
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Send size={20} className="-mt-1" /> Send Money
                                </div>
                            )}
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            className="w-32 h-14 rounded-2xl bg-gray-100 hover:bg-gray-200 text-[#343C6A] text-lg font-medium"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}