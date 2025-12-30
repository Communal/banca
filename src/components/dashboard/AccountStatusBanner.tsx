"use client";

import { AlertTriangle, Ban } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const AccountStatusBanner = () => {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading || !user || user.status === "active") return null;

    const isBlocked = user.status === "blocked";

    return (
        <div
            className={`w-full px-6 py-3 mb-6 rounded-2xl flex items-center gap-3 shadow-sm ${isBlocked
                    ? "bg-red-50 border border-red-100 text-red-700"
                    : "bg-orange-50 border border-orange-100 text-orange-700"
                }`}
        >
            {isBlocked ? <Ban size={20} /> : <AlertTriangle size={20} />}
            <div>
                <p className="font-bold text-sm uppercase tracking-wide">
                    Account {user.status}
                </p>
                <p className="text-sm opacity-90">
                    {isBlocked
                        ? "Your account has been blocked due to suspicious activity. All transactions are disabled."
                        : "Your account is temporarily suspended. Please contact support to restore full access."}
                </p>
            </div>
        </div>
    );
};