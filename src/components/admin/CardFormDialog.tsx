"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CardFormProps {
    userId: string;
    cardToEdit?: any | null; // If passed, we are in Edit mode
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CardFormDialog({ userId, cardToEdit, open, onOpenChange }: CardFormProps) {
    const queryClient = useQueryClient();
    const isEditing = !!cardToEdit;

    const [formData, setFormData] = useState({
        bankName: "",
        cardType: "primary",
        cardProvider: "mastercard",
        cardNumber: "",
        cardHolder: "",
        validThru: "",
        balance: "0.00",
    });

    // Load data when editing
    useEffect(() => {
        if (cardToEdit) {
            setFormData({
                bankName: cardToEdit.bankName || "",
                cardType: cardToEdit.cardType || "primary",
                cardProvider: cardToEdit.cardProvider || "mastercard",
                cardNumber: cardToEdit.cardNumber || "",
                cardHolder: cardToEdit.cardHolder || "",
                validThru: cardToEdit.validThru || "",
                balance: cardToEdit.balance || "0.00",
            });
        } else {
            // Reset defaults for new card
            setFormData({
                bankName: "",
                cardType: "primary",
                cardProvider: "mastercard",
                cardNumber: "",
                cardHolder: "",
                validThru: "",
                balance: "0.00",
            });
        }
    }, [cardToEdit, open]);

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const method = isEditing ? "PATCH" : "POST";
            const payload = isEditing ? { ...data, id: cardToEdit.id } : { ...data, userId };

            const res = await fetch("/api/admin/cards", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save card");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-user", userId] });
            toast.success(isEditing ? "Card updated" : "Card added");
            onOpenChange(false);
        },
        onError: () => toast.error("Something went wrong"),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-[#343C6A] text-xl font-bold">
                        {isEditing ? "Edit Card Details" : "Add New Card"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Bank Name</Label>
                            <Input
                                value={formData.bankName}
                                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                placeholder="e.g. DBL Bank"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Card Type</Label>
                            <Select
                                value={formData.cardType}
                                onValueChange={(val) => setFormData({ ...formData, cardType: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="primary">Primary</SelectItem>
                                    <SelectItem value="secondary">Secondary</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Card Number (Full)</Label>
                            <Input
                                value={formData.cardNumber}
                                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                placeholder="**** **** **** ****"
                                required
                                minLength={16}
                                maxLength={19}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Card Provider</Label>
                            <Select
                                value={formData.cardProvider}
                                onValueChange={(val) => setFormData({ ...formData, cardProvider: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mastercard">Mastercard</SelectItem>
                                    <SelectItem value="visa">Visa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Card Holder Name</Label>
                            <Input
                                value={formData.cardHolder}
                                onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                                placeholder="Name on Card"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Valid Thru</Label>
                            <Input
                                value={formData.validThru}
                                onChange={(e) => setFormData({ ...formData, validThru: e.target.value })}
                                placeholder="MM/YY"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Initial Balance</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={formData.balance}
                            onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="bg-[#1814F3] hover:bg-blue-700 text-white"
                        >
                            {mutation.isPending ? "Saving..." : "Save Card"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}