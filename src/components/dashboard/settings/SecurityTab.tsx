"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const SecurityTab = ({ data }: { data: any }) => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <h4 className="text-[#343C6A] text-lg font-bold">
          Two-factor Authentication
        </h4>
        <div className="flex items-center gap-4">
          {/* Custom styled switch to match the green design */}
          <Switch
            checked={data?.twoFactorEnabled}
            className="data-[state=checked]:bg-[#16DBCC]"
          />
          <span className="text-[#343C6A] text-sm md:text-base">
            Enable or disable two factor authentication
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[#343C6A] text-lg font-bold">Change Password</h4>
        <div className="space-y-2">
          <label className="text-[#343C6A] text-sm font-medium">
            Current Password
          </label>
          <Input
            type="password"
            defaultValue="123456789"
            readOnly
            className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[#343C6A] text-sm font-medium">
            New Password
          </label>
          <Input
            type="password"
            placeholder="**********"
            readOnly
            className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
          />
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
