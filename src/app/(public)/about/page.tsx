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

import type { Metadata } from "next";
import { makeMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata({
    title: "About — Montedeiazzu",
    description:
      "Learn about Montedeiazzu's mission, values, and team building modern banking experiences.",
    pathname: "/about",
  });
}
