"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Facebook } from "lucide-react";

const LoginForm = () => {
  const router = useRouter(); // 2. Initialize router
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const loginMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
      return result;
    },
    onSuccess: (data) => {
      // 3. Invalidate 'me' query to ensure the UI updates the user state immediately
      queryClient.invalidateQueries({ queryKey: ["me"] });

      // 4. Redirect based on the role returned from the API
      if (data.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    },
    onError: (error: Error) => {
      alert(error.message); // Show the specific error message from the API
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  // ... rest of your JSX remains the same ...
  return (
    <div className="w-full max-w-5xl mx-auto overflow-hidden relative z-10">
      {/* Background Pattern Placeholder */}
      <div className="absolute inset-0 bg-[url('/images/abstract-bg.jpg')] bg-cover bg-center opacity-5 pointer-events-none -z-10"></div>

      <div className="p-8 md:p-12 rounded-[2rem]">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-primary">
            Login
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">
            Welcome back! Please log in to access your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          {/* Email */}
          <div className="space-y-2">
            <Input
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-full py-6 px-6 bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 focus-visible:ring-brand-accent"
            />
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="rounded-full py-6 px-6 bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 pr-12 focus-visible:ring-brand-accent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-brand-primary hover:text-brand-accent hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-2">
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-full bg-brand-accent hover:bg-blue-600 text-white py-6 text-lg font-medium shadow-md transition-all"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>

            <Link href="/signup" className="block w-full">
              <Button
                variant="secondary"
                type="button"
                className="w-full rounded-full bg-gray-200/50 hover:bg-gray-300/50 text-gray-600 py-6 text-lg font-medium border border-transparent hover:border-gray-300 transition-all"
              >
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className=" px-4 text-gray-500 bg-brand-light md:bg-brand-light">
                Or Continue with
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            <button
              type="button"
              className="w-14 h-14 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-sm"
            >
              <div
                className="w-6 h-6 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg')",
                }}
              ></div>
            </button>
            <button
              type="button"
              className="w-14 h-14 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-sm"
            >
              <Facebook className="text-[#1877F2] w-6 h-6 fill-current" />
            </button>
            <button
              type="button"
              className="w-14 h-14 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-sm"
            >
              <div
                className="w-6 h-6 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg')",
                }}
              ></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;