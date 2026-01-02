"use client";

import { ShieldAlert, AlertTriangle, Snowflake } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const AccountStatusBanner = () => {
    const { data: authData, isLoading } = useCurrentUser();
    const user = authData?.user;

    // Don't show if loading, missing, or active
    if (isLoading || !user || user.status === "active") return null;

    // Define configuration for each state
    const statusConfig = {
        blocked: {
            title: "Access Restricted",
            icon: <ShieldAlert className="h-5 w-5 md:h-7 md:w-7 text-red-600" />,
            bgBorder: "border-red-100",
            bgCircle: "bg-red-50",
            decoration: "bg-red-500",
            textColor: "text-red-500",
            defaultReason: "We detected unusual activity on your account.",
            actionText: "Contact support to verify your identity."
        },
        suspended: {
            title: "Account Suspended",
            icon: <AlertTriangle className="h-5 w-5 md:h-7 md:w-7 text-orange-600" />,
            bgBorder: "border-orange-100",
            bgCircle: "bg-orange-50",
            decoration: "bg-orange-500",
            textColor: "text-orange-500",
            defaultReason: "Your account has been temporarily suspended pending review.",
            actionText: "Contact support to restore full access."
        },
        frozen: {
            title: "Account Frozen",
            icon: <Snowflake className="h-5 w-5 md:h-7 md:w-7 text-blue-600" />,
            bgBorder: "border-blue-100",
            bgCircle: "bg-blue-50",
            decoration: "bg-blue-500",
            textColor: "text-blue-500",
            defaultReason: "Your account is currently frozen. No transactions can be made.",
            actionText: "Please contact support for more details."
        }
    };

    // Get the specific config for the current status (fallback to suspended if unknown)
    const currentStatus = user.status as keyof typeof statusConfig;
    const config = statusConfig[currentStatus] || statusConfig.suspended;

    const reasonText = user.statusReason || config.defaultReason;

    return (
        <div className="w-full mb-4 md:mb-8 animate-in slide-in-from-top-4 duration-500">
            <div className={`bg-white rounded-xl md:rounded-[2rem] p-4 md:p-8 shadow-sm border ${config.bgBorder} flex flex-col md:flex-row gap-4 md:gap-6 relative overflow-hidden`}>

                {/* Decorative Status Line */}
                <div className={`absolute top-0 left-0 w-1 h-full ${config.decoration}`} />

                {/* Icon */}
                <div className={`h-10 w-10 md:h-14 md:w-14 rounded-full ${config.bgCircle} flex items-center justify-center shrink-0`}>
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
                            {config.actionText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};