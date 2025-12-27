"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface TransactionFormProps {
    userId: string;
    userCards: any[]; // We need the user's cards to select from
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TransactionFormDialog({ userId, userCards, open, onOpenChange }: TransactionFormProps) {
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        cardId: "",
        description: "",
        type: "shopping", // Default from enum
        category: "expense", // To determine positive/negative sign
        amount: "",
        date: new Date().toISOString().split('T')[0], // Today YYYY-MM-DD
    });

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            // Calculate final amount based on category (Expense = negative)
            const finalAmount = data.category === "expense"
                ? -Math.abs(Number(data.amount))
                : Math.abs(Number(data.amount));

            const payload = {
                cardId: data.cardId,
                description: data.description,
                type: data.type,
                amount: finalAmount,
                date: data.date,
                status: 'completed'
            };

            const res = await fetch("/api/admin/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-user", userId] });
            toast.success("Transaction added");
            onOpenChange(false);
            setFormData({ ...formData, description: "", amount: "" }); // Reset fields
        },
        onError: () => toast.error("Failed to add transaction"),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.cardId) {
            toast.error("Please select a card");
            return;
        }
        mutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-[#343C6A] text-xl font-bold">Add New Transaction</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">

                    {/* Card Selection */}
                    <div className="space-y-2">
                        <Label>Select Card</Label>
                        <Select
                            value={formData.cardId}
                            onValueChange={(val) => setFormData({ ...formData, cardId: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a card..." />
                            </SelectTrigger>
                            <SelectContent>
                                {userCards.map(card => (
                                    <SelectItem key={card.id} value={card.id}>
                                        {card.bankName} (**** {card.lastFourDigits})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(val) => setFormData({ ...formData, category: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="expense">Expense (-)</SelectItem>
                                    <SelectItem value="income">Income (+)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Transaction Type</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(val) => setFormData({ ...formData, type: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="service">Service</SelectItem>
                                    <SelectItem value="transfer">Transfer</SelectItem>
                                    <SelectItem value="income">Income</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="e.g. Spotify Subscription"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Amount ($)</Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" className="bg-[#1814F3] hover:bg-blue-700 text-white">Save Transaction</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}