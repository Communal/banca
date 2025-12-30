"use client";

import { ShieldAlert, AlertTriangle } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";

export const AccountStatusBanner = () => {
    const { data: user, isLoading } = useCurrentUser();

    // 1. ACTIVE: Don't show anything
    if (isLoading || !user || user.status === "active") return null;

    // 2. DETERMINE STATE (Blocked vs Suspended)
    const isBlocked = user.status === "blocked";
    const isSuspended = user.status === "suspended";

    // 3. DEFINE CONTENT BASED ON STATUS
    const config = {
        color: isBlocked ? "red" : "orange", // Red for Blocked, Orange for Suspended
        title: isBlocked ? "Access Restricted" : "Account Suspended",
        icon: isBlocked ? <ShieldAlert className="h-7 w-7 text-red-600" /> : <AlertTriangle className="h-7 w-7 text-orange-600" />,
        bgBorder: isBlocked ? "border-red-100" : "border-orange-100",
        bgCircle: isBlocked ? "bg-red-50" : "bg-orange-50",
        decoration: isBlocked ? "bg-red-500" : "bg-orange-500",
        defaultReason: isBlocked
            ? "We detected unusual activity on your account."
            : "Your account has been temporarily suspended pending review.",
    };

    // Use admin-provided reason from DB, or fallback to default
    const reasonText = user.statusReason || config.defaultReason;

    return (
        <div className="w-full mb-8 animate-in slide-in-from-top-4 duration-500">
            <div className={`bg-white rounded-[20px] p-6 md:p-8 shadow-sm border ${config.bgBorder} flex flex-col md:flex-row items-start gap-6 relative overflow-hidden`}>

                {/* Decorative Status Line */}
                <div className={`absolute top-0 left-0 w-1 h-full ${config.decoration}`} />

                {/* Icon Circle */}
                <div className={`h-14 w-14 rounded-full ${config.bgCircle} flex items-center justify-center shrink-0`}>
                    {config.icon}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                    <h3 className="text-[#343C6A] text-lg md:text-xl font-bold">
                        {config.title}
                    </h3>

                    <div className="text-[#718EBF] text-sm md:text-base leading-relaxed max-w-3xl space-y-2">
                        <p>
                            {reasonText}
                        </p>
                        <p className={`font-medium ${isBlocked ? "text-red-500" : "text-orange-500"}`}>
                            {isBlocked
                                ? "For your security, please contact customer support immediately to verify your identity."
                                : "Please contact support to resolve the suspension and restore full access."}
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="shrink-0 pt-2 md:pt-0">
                    <Button
                        className="bg-[#1814F3] hover:bg-blue-700 text-white rounded-xl px-8 h-12 font-medium shadow-lg shadow-blue-500/20"
                        onClick={() => window.location.href = "mailto:support@yourbank.com"}
                    >
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
};