"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Ensure you have shadcn switch

export const PreferencesTab = ({ data }: { data: any }) => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[#343C6A] text-sm font-medium">Currency</label>
          <Input
            defaultValue={data?.currency}
            readOnly
            className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[#343C6A] text-sm font-medium">
            Time Zone
          </label>
          <Input
            defaultValue={data?.timeZone}
            readOnly
            className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[#343C6A] text-lg font-bold">Notification</h4>

        <div className="flex items-center gap-4">
          <Switch
            checked={data?.notifyDigitalCurrency}
            className="data-[state=checked]:bg-[#16DBCC]"
          />
          <span className="text-[#343C6A] text-sm md:text-base">
            I send or receive digital currency
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            checked={data?.notifyMerchantOrder}
            className="data-[state=checked]:bg-[#16DBCC]"
          />
          <span className="text-[#343C6A] text-sm md:text-base">
            I receive merchant order
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            checked={data?.notifyRecommendations}
            className="data-[state=checked]:bg-[#16DBCC]"
          />
          <span className="text-[#343C6A] text-sm md:text-base">
            There are recommendation for my account
          </span>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button className="w-full md:w-40 h-12 rounded-2xl bg-[#1814F3] hover:bg-blue-700 text-lg font-medium">
          Save
        </Button>
      </div>
    </div>
  );
};
