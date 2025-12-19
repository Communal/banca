"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { useState, useEffect, use } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditUserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${id}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const [formData, setFormData] = useState<any>({});

  // Sync state when data loads
  useEffect(() => {
    if (data?.user) setFormData(data.user);
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: async (newData: any) => {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user", id] });
      toast.success("User profile updated successfully");
      // Optional: Move to next tab as per design "Next" button?
      // router.push(`/admin/users/${params.id}/cards`);
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    updateMutation.mutate(formData);
  };

  if (isLoading)
    return <div className="animate-pulse h-96 bg-gray-50 rounded-xl" />;

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-14">
      {/* Avatar */}
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

      {/* Form */}
      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[#343C6A] text-sm font-medium">
              Your Name
            </label>
            <Input
              name="fullName"
              value={formData.fullName || ""}
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
            <label className="text-[#343C6A] text-sm font-medium">
              Password
            </label>
            <Input
              name="password"
              type="password"
              placeholder="********"
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
              value={formData.dateOfBirth || ""}
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
              value={formData.presentAddress || ""}
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
            <label className="text-[#343C6A] text-sm font-medium">
              Postal Code
            </label>
            <Input
              name="postalCode"
              value={formData.postalCode || ""}
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
              value={formData.country || ""}
              onChange={handleChange}
              className="h-12 rounded-2xl border-gray-200 text-[#718EBF]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            disabled={updateMutation.isPending}
            className="w-full md:w-40 h-12 rounded-2xl bg-[#1814F3] hover:bg-blue-700 text-lg font-medium"
          >
            {updateMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
