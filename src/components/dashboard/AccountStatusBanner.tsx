"use client";

import { ShieldAlert, AlertTriangle } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";

export const AccountStatusBanner = () => {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading || !user || user.status === "active") return null;

    const isBlocked = user.status === "blocked";

    const config = {
        title: isBlocked ? "Access Restricted" : "Account Suspended",
        icon: isBlocked ? (
            <ShieldAlert className="h-5 w-5 md:h-7 md:w-7 text-red-600" />
        ) : (
            <AlertTriangle className="h-5 w-5 md:h-7 md:w-7 text-orange-600" />
        ),
        bgBorder: isBlocked ? "border-red-100" : "border-orange-100",
        bgCircle: isBlocked ? "bg-red-50" : "bg-orange-50",
        decoration: isBlocked ? "bg-red-500" : "bg-orange-500",
        defaultReason: isBlocked
            ? "We detected unusual activity on your account."
            : "Your account has been temporarily suspended pending review.",
        textColor: isBlocked ? "text-red-500" : "text-orange-500",
    };

    const reasonText = user.statusReason || config.defaultReason;

    return (
        <div className="w-full mb-4 md:mb-8 animate-in slide-in-from-top-4 duration-500">
            <div
                className={`bg-white rounded-xl md:rounded-4xl
                p-4 md:p-8 shadow-sm border ${config.bgBorder}
                flex flex-col md:flex-row gap-4 md:gap-6
                relative overflow-hidden`}
            >
                {/* Decorative Status Line */}
                <div className={`absolute top-0 left-0 w-1 h-full ${config.decoration}`} />

                {/* Icon */}
                <div
                    className={`h-10 w-10 md:h-14 md:w-14
                    rounded-full ${config.bgCircle}
                    flex items-center justify-center shrink-0`}
                >
                    {config.icon}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2 md:space-y-3">
                    <h3 className="text-[#343C6A] text-base md:text-xl font-bold">
                        {config.title}
                    </h3>

                    <div className="text-[#718EBF] text-xs md:text-base leading-relaxed space-y-1 md:space-y-2">
                        <p>{reasonText}</p>
                        <p className={`font-medium ${config.textColor}`}>
                            {isBlocked
                                ? "Contact support to verify your identity."
                                : "Contact support to restore full access."}
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                {/* <div className="w-full md:w-auto pt-2 md:pt-0">
                    <Button
                        className="
                            w-full md:w-auto
                            h-10 md:h-12
                            px-4 md:px-8
                            text-sm md:text-base
                            rounded-lg md:rounded-xl
                            bg-[#1814F3] hover:bg-blue-700 text-white
                            font-medium shadow-lg shadow-blue-500/20
                        "
                        onClick={() =>
                            (window.location.href = "mailto:support@yourbank.com")
                        }
                    >
                        Contact Support
                    </Button>
                </div> */}
            </div>
        </div>
    );
};
