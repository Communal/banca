import AboutHero from "@/components/sections/about/AboutHero";
import MissionSection from "@/components/sections/about/MissionSection";
import PressReleases from "@/components/sections/about/PressReleases"; // Created in previous steps
import CTABanner from "@/components/sections/CTABanner"; // Reused from Home

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-0 md:gap-8">
      <AboutHero />
      <MissionSection />
      <PressReleases />
      <CTABanner />
    </div>
  );
}
