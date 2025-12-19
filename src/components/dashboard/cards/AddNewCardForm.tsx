"use client";
import { useState } from "react";
import { useAddCard } from "@/hooks/useCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const AddNewCardForm = () => {
  const addCard = useAddCard();

  // State matching the DB schema expectations
  const [formData, setFormData] = useState({
    cardType: "primary", // Default to primary
    cardHolder: "",
    cardNumber: "",
    validThru: "",
    bankName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.cardNumber || !formData.cardHolder || !formData.bankName) {
      alert("Please fill in all fields");
      return;
    }

    addCard.mutate(formData, {
      onSuccess: () => {
        // Reset form on success
        setFormData({
          cardType: "primary",
          cardHolder: "",
          cardNumber: "",
          validThru: "",
          bankName: "",
        });
        alert("Card added successfully!");
      },
      onError: () => {
        alert("Failed to add card. Please try again.");
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm">
      <h3 className="text-lg font-bold text-[#343C6A] mb-6">Add New Card</h3>
      <p className="text-sm text-gray-500 mb-8 max-w-2xl">
        Credit Card generally means a plastic card issued by Scheduled
        Commercial Banks assigned to a Cardholder.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[#343C6A] font-medium text-sm">
              Card Type
            </label>
            <Input
              name="cardType"
              placeholder="Classic / Primary / Secondary"
              className="rounded-xl border-gray-200 py-6 text-gray-600"
              value={formData.cardType}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] font-medium text-sm">
              Name On Card
            </label>
            <Input
              name="cardHolder"
              placeholder="My Cards"
              className="rounded-xl border-gray-200 py-6 text-gray-600"
              value={formData.cardHolder}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] font-medium text-sm">
              Card Number
            </label>
            <Input
              name="cardNumber"
              placeholder="**** **** **** ****"
              className="rounded-xl border-gray-200 py-6 text-gray-600"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength={16}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] font-medium text-sm">
              Expiration Date
            </label>
            <Input
              name="validThru"
              placeholder="MM/YY"
              className="rounded-xl border-gray-200 py-6 text-gray-600"
              value={formData.validThru}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] font-medium text-sm">
              Bank Name
            </label>
            <Input
              name="bankName"
              placeholder="DBL Bank"
              className="rounded-xl border-gray-200 py-6 text-gray-600"
              value={formData.bankName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={addCard.isPending}
          className="bg-[#1814F3] hover:bg-blue-700 text-white rounded-xl px-12 py-6 text-base font-medium mt-4 w-full md:w-auto"
        >
          {addCard.isPending ? "Adding..." : "Add Card"}
        </Button>
      </form>
    </div>
  );
};
