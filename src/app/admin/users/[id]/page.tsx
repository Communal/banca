"use client";

import { use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserProfileForm } from "@/components/admin/UserProfileForm";

export default function EditUserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const queryClient = useQueryClient();

  // Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${id}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  // Update Mutation
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
    },
    onError: () => toast.error("Failed to update profile"),
  });

  if (isLoading)
    return <div className="animate-pulse h-96 bg-gray-50 rounded-xl" />;

  return (
    <UserProfileForm
      initialData={data?.user}
      onSubmit={(newData) => updateMutation.mutate(newData)}
      isSaving={updateMutation.isPending}
    />
  );
}