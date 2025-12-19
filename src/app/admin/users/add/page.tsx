"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { Camera } from "lucide-react";

export default function AddUserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Initial empty state
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "", // Required for new users
    dateOfBirth: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const createMutation = useMutation({
    mutationFn: async (newUser: any) => {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create");
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-data"] }); // Refresh dashboard list
      toast.success("User created successfully!");
      // Redirect to the EDIT page of this new user so you can add cards immediately
      router.push(`/admin/users/${data.userId}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    createMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 min-h-[85vh]">
      <div className="border-b border-gray-200 mb-8 pb-4">
        <h2 className="text-[#343C6A] text-xl font-bold">Add New User</h2>
        <p className="text-[#718EBF] text-sm">
          Create a new user profile. You can add cards and transactions after
          saving.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-14 animate-in fade-in duration-300">
        {/* Avatar Placeholder */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-dashed border-[#718EBF] flex items-center justify-center bg-gray-50">
              <Camera className="text-[#718EBF]" size={32} />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[#343C6A] text-sm font-medium">
                Full Name *
              </label>
              <Input
                name="fullName"
                placeholder="ex. Charlene Reed"
                value={formData.fullName}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#343C6A] text-sm font-medium">
                User Name
              </label>
              <Input
                name="userName"
                placeholder="ex. Charlene"
                value={formData.userName}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#343C6A] text-sm font-medium">
                Email *
              </label>
              <Input
                name="email"
                type="email"
                placeholder="ex. charlene@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#343C6A] text-sm font-medium">
                Password *
              </label>
              <Input
                name="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#343C6A] text-sm font-medium">
                Date of Birth
              </label>
              <Input
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#343C6A] text-sm font-medium">
                Present Address
              </label>
              <Input
                name="presentAddress"
                placeholder="San Jose, CA"
                value={formData.presentAddress}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#343C6A] text-sm font-medium">
                Permanent Address
              </label>
              <Input
                name="permanentAddress"
                placeholder="San Jose, CA"
                value={formData.permanentAddress}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#343C6A] text-sm font-medium">City</label>
              <Input
                name="city"
                placeholder="San Jose"
                value={formData.city}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#343C6A] text-sm font-medium">
                Postal Code
              </label>
              <Input
                name="postalCode"
                placeholder="45962"
                value={formData.postalCode}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#343C6A] text-sm font-medium">
                Country
              </label>
              <Input
                name="country"
                placeholder="USA"
                value={formData.country}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full md:w-40 h-12 rounded-2xl border-[#1814F3] text-[#1814F3] hover:bg-blue-50 text-lg font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createMutation.isPending}
              className="w-full md:w-40 h-12 rounded-2xl bg-[#1814F3] hover:bg-blue-700 text-lg font-medium"
            >
              {createMutation.isPending ? "Creating..." : "Create User"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
