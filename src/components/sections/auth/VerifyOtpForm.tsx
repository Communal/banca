"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyOtpForm = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const mutation = useMutation({
    mutationFn: async (otp: string) => {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ otp }),
      });
      if (!res.ok) throw new Error("Invalid OTP");
      return res.json();
    },
    onSuccess: () => {
      router.push("/reset-password");
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden relative z-10">
      <div className="absolute inset-0 bg-[url('/images/abstract-bg.jpg')] bg-cover bg-center opacity-5 pointer-events-none -z-10"></div>

      <div className="p-8 md:p-12 rounded-[2rem] bg-white/50 backdrop-blur-sm md:bg-transparent">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-primary">
            Verify OTP
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Enter the 6-digit code sent to your email.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(otp);
          }}
          className="space-y-6 max-w-lg mx-auto"
        >
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter OTP Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="rounded-full py-6 px-6 bg-white border-gray-300 placeholder:text-gray-400 text-center tracking-widest text-xl font-bold"
              maxLength={6}
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-full bg-brand-accent hover:bg-blue-600 text-white py-6 text-lg font-medium shadow-md"
          >
            {mutation.isPending ? "Verifying..." : "Verify & Proceed"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
