"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      // Basic validation
      if (passwords.newPassword !== passwords.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const res = await fetch("/api/reset-password", { method: "POST" });
      if (!res.ok) throw new Error("Failed to reset");
      return res.json();
    },
    onSuccess: () => {
      alert("Password Reset Successful! Redirecting to login...");
      router.push("/login");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden relative z-10">
      <div className="absolute inset-0 bg-[url('/images/abstract-bg.jpg')] bg-cover bg-center opacity-5 pointer-events-none -z-10"></div>

      <div className="p-8 md:p-12 rounded-[2rem] bg-white/50 backdrop-blur-sm md:bg-transparent">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-primary">
            Reset Password
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Create a new strong password for your account.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          className="space-y-6 max-w-lg mx-auto"
        >
          <div className="space-y-4">
            <div className="relative">
              <Input
                name="newPassword"
                type={showPass ? "text" : "password"}
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handleChange}
                className="rounded-full py-6 px-6 bg-white border-gray-300 pr-12"
              />
            </div>

            <div className="relative">
              <Input
                name="confirmPassword"
                type={showPass ? "text" : "password"}
                placeholder="Confirm New Password"
                value={passwords.confirmPassword}
                onChange={handleChange}
                className="rounded-full py-6 px-6 bg-white border-gray-300 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-full bg-brand-accent hover:bg-blue-600 text-white py-6 text-lg font-medium shadow-md"
          >
            {mutation.isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
