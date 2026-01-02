"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Pencil, AlertTriangle, Snowflake } from "lucide-react";
import { CURRENCIES } from "@/lib/currency";

interface UserProfileFormProps {
    initialData?: any;
    onSubmit: (data: any) => void;
    isSaving: boolean;
}

export const UserProfileForm = ({ initialData, onSubmit, isSaving }: UserProfileFormProps) => {
    const [formData, setFormData] = useState<any>({});

    // Sync state when initialData loads
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                status: initialData.status || "active",
                statusReason: initialData.statusReason || "",
                currency: initialData.currency || "USD", // Ensure currency has a default
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStatusChange = (value: string) => {
        setFormData({ ...formData, status: value });
    };

    // Handler for currency select
    const handleCurrencyChange = (value: string) => {
        setFormData({ ...formData, currency: value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-14">
                {/* Avatar Section */}
                <div className="flex justify-center md:justify-start">
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <Image
                                src={formData.avatarUrl || "https://i.pravatar.cc/150"}
                                alt="Profile"
                                width={160}
                                height={160}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <button className="absolute bottom-4 right-0 bg-[#1814F3] p-2 rounded-full text-white border-2 border-white">
                            <Pencil size={14} />
                        </button>
                    </div>
                </div>

                {/* Basic Info Form */}
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">Your Name</label>
                            <Input
                                name="fullName"
                                value={formData.fullName || ""}
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">User Name</label>
                            <Input
                                name="userName"
                                value={formData.userName || ""}
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">Email</label>
                            <Input
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">Password</label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="********"
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">Date of Birth</label>
                            <Input
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth || ""}
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
                            />
                        </div>

                        {/* --- CURRENCY SELECTOR (Re-added) --- */}
                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">Account Currency</label>
                            <Select value={formData.currency} onValueChange={handleCurrencyChange}>
                                <SelectTrigger className="h-12 rounded-2xl border-gray-200 text-[#718EBF]">
                                    <SelectValue placeholder="Select Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CURRENCIES.map((c) => (
                                        <SelectItem key={c.value} value={c.value}>
                                            {c.label} ({c.symbol})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {/* ------------------------------------- */}

                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">Present Address</label>
                            <Input
                                name="presentAddress"
                                value={formData.presentAddress || ""}
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">Permanent Address</label>
                            <Input
                                name="permanentAddress"
                                value={formData.permanentAddress || ""}
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">City</label>
                            <Input
                                name="city"
                                value={formData.city || ""}
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">Postal Code</label>
                            <Input
                                name="postalCode"
                                value={formData.postalCode || ""}
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[#343C6A] text-sm font-medium">Country</label>
                            <Input
                                name="country"
                                value={formData.country || ""}
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* --- ACCOUNT STATUS SECTION --- */}
            <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-red-800 font-bold text-lg mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} /> Account Status
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[#343C6A] text-sm font-medium">Current Status</label>
                        <Select
                            value={formData.status}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="h-12 rounded-2xl border-gray-200 bg-white text-[#718EBF]">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="suspended">Suspended (Temporary)</SelectItem>
                                <SelectItem value="frozen">Frozen (Indefinite)</SelectItem>
                                <SelectItem value="blocked">Blocked (Permanent)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Conditional Reason Field */}
                    {(formData.status === "blocked" || formData.status === "suspended") && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                            <label className="text-[#343C6A] text-sm font-medium">
                                Reason for Action
                            </label>
                            <Textarea
                                name="statusReason"
                                value={formData.statusReason || ""}
                                onChange={handleChange}
                                placeholder="e.g. Suspicious transaction activity detected..."
                                className="min-h-[100px] rounded-2xl border-gray-200 bg-white p-4 text-[#718EBF] resize-none focus-visible:ring-[#1814F3]"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="w-full md:w-40 h-12 rounded-2xl bg-[#1814F3] hover:bg-blue-700 text-lg font-medium shadow-lg shadow-blue-500/20"
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
};