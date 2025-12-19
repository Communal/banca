import { useQuery } from "@tanstack/react-query";

interface User {
    id: string;
    fullName: string;
    email: string;
    role: 'user' | 'admin';
    avatarUrl: string | null;
}

export const useUser = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await fetch("/api/auth/me");
            if (!res.ok) return null;
            const data = await res.json();
            return data.user as User | null;
        },
        retry: false, // Don't retry if not logged in
    });
};