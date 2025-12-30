"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserProfileForm } from "@/components/admin/UserProfileForm"; // <--- Import the reusable form

export default function AddUserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (newUser: any) => {
      // API call to create user
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
      queryClient.invalidateQueries({ queryKey: ["admin-data"] });
      toast.success("User created successfully!");
      // Redirect to the edit page of the new user to add cards/transactions
      router.push(`/admin/users/${data.userId}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 min-h-[85vh]">
      <div className="border-b border-gray-200 mb-8 pb-4">
        <h2 className="text-[#343C6A] text-xl font-bold">Add New User</h2>
        <p className="text-[#718EBF] text-sm">
          Create a new user profile. Cards and transactions can be added after saving.
        </p>
      </div>

      {/* Reuse the form component */}
      <UserProfileForm
        onSubmit={(data) => createMutation.mutate(data)}
        isSaving={createMutation.isPending}
        // Set defaults for creation mode
        initialData={{
          currency: 'USD',
          status: 'active',
          country: 'USA'
        }}
      />
    </div>
  );
}