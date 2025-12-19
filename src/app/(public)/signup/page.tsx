import SignUpForm from "@/components/sections/auth/SignUpForm";
import Testimonials from "@/components/sections/Testimonials"; // Reusing existing component

export default function SignUpPage() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-20">
      {/* Top Section: Sign Up Form */}
      <section className="container mx-auto px-4 mb-20">
        <SignUpForm />
      </section>

      {/* Bottom Section: Testimonials */}
      {/* This matches the design where testimonials appear directly below the signup form */}
      <Testimonials />
    </div>
  );
}
