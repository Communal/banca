"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";

export const EditProfileTab = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-14">
      {/* Avatar Section */}
      <div className="flex justify-center md:justify-start">
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <Image
              src={data?.avatarUrl || "/avatars/default.jpg"}
              alt="Profile"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
          <button className="absolute bottom-2 right-2 bg-[#1814F3] p-2 rounded-full text-white border-2 border-white hover:bg-blue-700 transition-colors">
            <Pencil size={16} />
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">
              Your Name
            </label>
            <Input
              defaultValue={data?.fullName}
              readOnly
              className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">
              User Name
            </label>
            <Input
              defaultValue={data?.userName}
              readOnly
              className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">Email</label>
            <Input
              defaultValue={data?.email}
              readOnly
              className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">
              Password
            </label>
            <Input
              type="password"
              defaultValue="12345678"
              readOnly
              className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">
              Date of Birth
            </label>
            <Input
              defaultValue={data?.dateOfBirth}
              readOnly
              className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">
              Present Address
            </label>
            <Input
              defaultValue={data?.presentAddress}
              readOnly
              className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">
              Permanent Address
            </label>
            <Input
              defaultValue={data?.permanentAddress}
              readOnly
              className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">City</label>
            <Input
              defaultValue={data?.city}
              readOnly
              className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">
              Postal Code
            </label>
            <Input
              defaultValue={data?.postalCode}
              readOnly
              className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">
              Country
            </label>
            <Input
              defaultValue={data?.country}
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
    </div>
  );
};
