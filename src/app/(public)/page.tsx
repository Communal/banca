import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Features from "@/components/sections/Features";
import FAQ from "@/components/sections/FAQ";
import UseCases from "@/components/sections/UseCases";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import { faqData } from "@/components/sections/FAQ";
import { SITE_URL } from "@/lib/seo";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Montedeiazzu",
        "url": SITE_URL || "https://yourdomain.com",
        "logo": `${SITE_URL || "https://yourdomain.com"}/images/logo.png`
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqData.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col gap-8 md:gap-16">
        <Hero />
        <Products />
        <UseCases />
        <Features />
        <FAQ />
        <Testimonials />

        {/* Simple CTA Banner at bottom */}
        <CTABanner />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { makeMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata({
    title: "Montedeiazzu — Modern banking for individuals & businesses",
    description:
      "Montedeiazzu provides secure, modern banking solutions — checking, savings, loans, and business accounts.",
    pathname: "/",
  });
}
