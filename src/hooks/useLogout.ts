import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await fetch("/api/logout", { method: "POST" });
        },
        onSuccess: () => {
            // 1. Clear React Query cache (removes user data from memory)
            queryClient.clear();

            // 2. Show feedback
            toast.success("Logged out successfully");

            // 3. Redirect to login
            router.push("/login");
        },
    });
};