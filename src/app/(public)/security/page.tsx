import SecurityHero from "@/components/sections/security/SecurityHero";
import SecurityProtection from "@/components/sections/security/SecurityProtection";
import FAQ from "@/components/sections/FAQ"; // Reusing existing component

export default function SecurityPage() {
  return (
    <div className="flex flex-col gap-0 md:gap-8">
      <SecurityHero />
      <SecurityProtection />
      <FAQ />
    </div>
  );
}
