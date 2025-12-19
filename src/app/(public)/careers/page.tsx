import CareersHero from "@/components/sections/careers/CareersHero";
import Values from "@/components/sections/careers/Values";
import Benefits from "@/components/sections/careers/Benefits";
import CTABanner from "@/components/sections/CTABanner"; // Reused from Home
import FAQ from "@/components/sections/FAQ"; // Reused from Home
import JobOpenings from "@/components/sections/careers/JobOpenings";

export default function CareersPage() {
  return (
    <div className="flex flex-col gap-0 md:gap-8">
      <CareersHero />
      <Values />
      <Benefits />
      <JobOpenings/>
      <FAQ />
      <CTABanner />
    </div>
  );
}
