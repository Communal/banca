import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface SignupData {
    fullName: string;
    email: string;
    password: string;
}

export const useSignup = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: SignupData) => {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Signup failed");
            }

            return result;
        },
        onSuccess: (data) => {
            // 1. Invalidate 'me' query so the UI updates with the new user immediately
            queryClient.invalidateQueries({ queryKey: ["me"] });

            // 2. Redirect based on role (optional, mostly for 'user')
            if (data.user.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/dashboard');
            }
        },
    });
};