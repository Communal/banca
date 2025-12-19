import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Features from "@/components/sections/Features";
import FAQ from "@/components/sections/FAQ";
import UseCases from "@/components/sections/UseCases";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-16">
      <Hero />
      <Products />
      <UseCases/>
      <Features />
      <FAQ />
      <Testimonials/>

      {/* Simple CTA Banner at bottom */}
      <CTABanner/>
    </div>
  );
}
