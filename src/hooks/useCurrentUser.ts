"use client";

import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: async () => {
            const res = await fetch("/api/auth/me");
            if (!res.ok) throw new Error("Failed to fetch user");
            return res.json();
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 mins
    });
}