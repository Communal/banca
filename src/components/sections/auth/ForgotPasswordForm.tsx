"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      return res.json();
    },
    onSuccess: () => {
      // Navigate to next step
      router.push("/verify-otp");
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden relative z-10">
      <div className="absolute inset-0 bg-[url('/images/abstract-bg.jpg')] bg-cover bg-center opacity-5 pointer-events-none -z-10"></div>

      <div className="p-8 md:p-12 rounded-[2rem] bg-white/50 backdrop-blur-sm md:bg-transparent">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-primary">
            Forgot Password
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Enter your email address to receive a verification code.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(email);
          }}
          className="space-y-6 max-w-lg mx-auto"
        >
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-full py-6 px-6 bg-white border-gray-300 placeholder:text-gray-400"
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-full bg-brand-accent hover:bg-blue-600 text-white py-6 text-lg font-medium shadow-md"
          >
            {mutation.isPending ? "Sending..." : "Send OTP"}
          </Button>

          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-gray-500 hover:text-brand-primary text-sm"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
