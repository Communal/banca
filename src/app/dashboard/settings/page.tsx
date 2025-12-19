"use client";
import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { EditProfileTab } from "@/components/dashboard/settings/EditProfileTab";
import { PreferencesTab } from "@/components/dashboard/settings/PreferencesTab";
import { SecurityTab } from "@/components/dashboard/settings/SecurityTab";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "edit-profile" | "preferences" | "security"
  >("edit-profile");
  const { data, isLoading } = useSettings();

  if (isLoading) return <div className="h-screen bg-gray-100 animate-pulse" />;

  const tabs = [
    { id: "edit-profile", label: "Edit Profile" },
    { id: "preferences", label: "Preferences" },
    { id: "security", label: "Security" },
  ];

  return (
    <div className="bg-white min-h-[80vh] rounded-3xl p-6 md:p-1">
      {/* Tabs Header */}
      <div className="flex flex-wrap gap-4 md:gap-12 border-b border-gray-100 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "pb-3 text-sm md:text-base font-medium transition-colors relative px-2",
              activeTab === tab.id
                ? "text-[#1814F3]"
                : "text-[#718EBF] hover:text-[#343C6A]"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.75 bg-[#1814F3] rounded-t-md" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-500">
        {activeTab === "edit-profile" && <EditProfileTab data={data} />}
        {activeTab === "preferences" && <PreferencesTab data={data} />}
        {activeTab === "security" && <SecurityTab data={data} />}
      </div>
    </div>
  );
}
