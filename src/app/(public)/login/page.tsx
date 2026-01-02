import LoginForm from "@/components/sections/auth/LoginForm";
import Testimonials from "@/components/sections/Testimonials"; // Reusing existing component

export default function LoginPage() {
  return (
    <div className="bg-brand-light min-h-screen pt-10 pb-20">
      {/* Top Section: Login Form */}
      <section className="container mx-auto px-4 mb-20">
        <LoginForm />
      </section>

      {/* Bottom Section: Testimonials */}
      <Testimonials />
    </div>
  );
}

import type { Metadata } from "next";
import { makeMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata({
    title: "Log In — Montedeiazzu",
    description: "Log in to your Montedeiazzu account to manage finances securely.",
    pathname: "/login",
  });
}
