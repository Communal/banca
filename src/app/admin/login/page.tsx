"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Eye,
  EyeOff,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "sonner"; // 1. Import toast

export default function AdminLoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const loginMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login failed");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      // 2. Success Toast
      toast.success("Welcome back, Admin!");
      router.push("/admin/dashboard");
    },
    onError: (error: Error) => {
      // 3. Error Toast
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation trigger
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    loginMutation.mutate(formData);
  };

  // ... (Rest of the JSX remains exactly the same) ...
  return (
    <div className="flex-1 flex flex-col">
      {/* ... your existing JSX ... */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white/40 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-xl border border-white/50 relative">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>

          <div className="relative z-10 flex flex-col items-center justify-center py-16 px-6 md:px-20 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-500 mb-10 text-sm md:text-base">
              Enter Admin details to access portal
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
              <Input
                type="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-full py-6 px-6 bg-white border-gray-300 text-gray-800 focus-visible:ring-brand-accent shadow-sm"
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="rounded-full py-6 px-6 bg-white border-gray-300 text-gray-800 focus-visible:ring-brand-accent shadow-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full rounded-full bg-[#2D60FF] hover:bg-blue-700 text-white py-6 text-base font-medium shadow-md mt-4 transition-transform active:scale-95"
              >
                {loginMutation.isPending ? "Verifying..." : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-5xl mx-auto px-4 py-8 mb-4">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-[#2D60FF] text-white p-1 rounded-sm w-6 h-6 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rotate-45"></div>
            </div>
            <span className="font-bold text-xl text-[#343C6A]">YourBanK</span>
          </div>
          <div className="w-full h-px bg-gray-300"></div>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-sm text-[#343C6A] font-medium">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#2D60FF]" /> hello@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-[#2D60FF]" /> +234 6677 9999
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#2D60FF]" /> Somewhere in the
              World
            </div>
          </div>
          <div className="w-full h-px bg-gray-300"></div>
          <div className="w-full bg-white rounded-3xl py-4 px-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm border border-gray-200">
            <div className="flex gap-4 absolute -top-5 left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 md:top-0">
              <div className="bg-[#2D60FF] p-2 rounded-full text-white">
                <Facebook size={18} />
              </div>
              <div className="bg-[#2D60FF] p-2 rounded-full text-white">
                <Twitter size={18} />
              </div>
              <div className="bg-[#2D60FF] p-2 rounded-full text-white">
                <Linkedin size={18} />
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">
              YourBank All Rights Reserved
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span className="hover:text-[#2D60FF] cursor-pointer">
                Privacy Policy
              </span>
              <span className="border-l border-gray-300 pl-4 hover:text-[#2D60FF] cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
