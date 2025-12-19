"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Facebook, Chrome, Smartphone } from "lucide-react"; // Icons for socials

const SignUpForm = () => {
  return (
    <div className="w-full max-w-5xl mx-auto md:bg-transparent rounded-[2rem] md:rounded-none overflow-hidden relative z-10">
      {/* Background with abstract geometric pattern (simulated with CSS/Image) */}
      <div className="absolute inset-0 bg-[url('/images/abstract-bg.jpg')] bg-cover bg-center opacity-10 md:opacity-5 pointer-events-none -z-10"></div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 md:bg-transparent md:backdrop-blur-none md:border-none p-8 md:p-0 rounded-[2rem]">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-accent md:text-brand-primary">
            Sign Up
          </h1>
          <p className="text-gray-400 md:text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Join our community today! Create an account to unlock exclusive
            features and personalized experiences.
          </p>
        </div>

        {/* Form Fields */}
        <form className="space-y-6 max-w-4xl mx-auto">
          {/* Row 1: Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter First Name"
                className="rounded-full py-6 px-6 bg-white border-gray-200 text-gray-800 placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter Last Name"
                className="rounded-full py-6 px-6 bg-white border-gray-200 text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Row 2: Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your Email"
                className="rounded-full py-6 px-6 bg-white border-gray-200 text-gray-800 placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2 relative">
              <Input
                type="password"
                placeholder="Enter your Password"
                className="rounded-full py-6 px-6 bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 pr-12"
              />
              <Eye className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4 md:max-w-2xl md:mx-auto">
            <Button className="w-full rounded-full bg-brand-accent hover:bg-blue-600 text-white py-6 text-lg">
              Sign Up
            </Button>

            <Link href="/login" className="block w-full">
              <Button
                variant="secondary"
                className="w-full rounded-full bg-gray-200/50 hover:bg-gray-300/50 text-gray-700 py-6 text-lg"
              >
                Login
              </Button>
            </Link>
          </div>

          {/* Divider */}
          <div className="relative md:max-w-2xl md:mx-auto py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-2 text-gray-500">
                Or Continue with
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
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
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Facebook className="text-blue-600 w-6 h-6 fill-current" />
            </button>
            <button
              type="button"
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
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

export default SignUpForm;
