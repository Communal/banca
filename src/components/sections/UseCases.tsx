import {
  Briefcase,
  Building2,
  CircleDollarSign,
  GraduationCap,
  HandCoins,
  Home,
  Layers,
  PiggyBank,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// --- Types ---
type Stat = {
  value: string;
  label: string;
};

type FeatureCard = {
  icon: React.ElementType;
  title: string;
};

type UseCaseRowProps = {
  title: string;
  description: string;
  stats: Stat[];
  features: FeatureCard[];
  reversed?: boolean; // Controls Left vs Right alignment
};

// --- Sub-Component: Individual Feature Box ---
const FeatureBox = ({ icon: Icon, title }: FeatureCard) => (
  <div className="bg-white h-full w-full p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 md:gap-4">
    {/* Icon Container: Smaller on mobile (w-10) to save space */}
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-light flex items-center justify-center text-brand-accent shrink-0">
      <Icon className="w-5 h-5 md:w-6 md:h-6" />
    </div>

    {/* Title: Smaller text on mobile to prevent overflow */}
    <span className="font-medium text-xs md:text-base text-brand-primary leading-tight">
      {title}
    </span>
  </div>
);
// --- Sub-Component: The Row (Text + Grid) ---
const UseCaseRow = ({
  title,
  description,
  stats,
  features,
  reversed,
}: UseCaseRowProps) => {
  return (
    <div
      className={`flex flex-col gap-12 lg:gap-20 items-center ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
    >
      {/* 1. The Grid of Cards (Visual) */}
      <div className="flex-1 w-full relative">
        {/* Decorative Dot Pattern Background */}
        <div className="absolute top-0 right-0 -z-10 opacity-20 transform translate-x-4 -translate-y-4">
          <svg width="100" height="100" fill="none">
            <defs>
              <pattern
                id="dot-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="2"
                  className="text-brand-primary"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dot-pattern)" />
          </svg>
        </div>

        {/* The Grid itself */}
        <div className="grid grid-cols-2 gap-4 bg-gray-100/50 p-4 rounded-3xl">
          {features.map((feature, idx) => (
            // FIX APPLIED HERE:
            // 1. aspect-square: Forces the card to always be a perfect square (1:1 ratio)
            // 2. w-full: Ensures it fills the grid column width
            // 3. You can change 'aspect-square' to 'aspect-[4/3]' if you want rectangles
            <div key={idx} className="aspect-square w-full relative">
              {/* We clone the element or wrap it to force height: 100% */}
              <div className="h-full w-full">
                {/* Ensure your FeatureBox component allows className props or naturally fills height */}
                <FeatureBox {...feature} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. The Text Content */}
      <div className="flex-1 space-y-8 text-center lg:text-left">
        <div>
          <h3 className="text-3xl font-bold text-brand-primary mb-4">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 border-l-0 lg:border-l-0 divide-x divide-gray-300">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`px-2 flex flex-col items-center lg:items-start ${idx === 0 ? "pl-0" : ""
                }`}
            >
              <span className="text-4xl font-bold text-brand-accent mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500 text-center lg:text-left">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <Link href="/products">
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 text-brand-accent border-gray-300 hover:bg-brand-light"
          >
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
};

// --- Main Component ---
const UseCases = () => {
  // Data for "Individuals"
  const individualsData: UseCaseRowProps = {
    title: "For Individuals",
    description:
      "For individuals, our mortgage services pave the way to homeownership, and our flexible personal loans provide vital support during various life milestones. We also prioritize retirement planning, ensuring a financially secure future for our customers.",
    stats: [
      { value: "78%", label: "Secure Retirement Planning" },
      { value: "63%", label: "Manageable Debt Consolidation" },
      { value: "91%", label: "Reducing financial burdens" },
    ],
    features: [
      { icon: HandCoins, title: "Managing Personal Finances" },
      { icon: PiggyBank, title: "Saving for the Future" },
      { icon: Home, title: "Homeownership" },
      { icon: GraduationCap, title: "Education Funding" },
    ],
  };

  // Data for "Business"
  const businessData: UseCaseRowProps = {
    title: "For Business",
    description:
      "For businesses, we empower growth with working capital solutions that optimize cash flow, and our tailored financing options fuel business expansion. Whatever your financial aspirations, Montedeiazzu is committed to providing the right tools.",
    stats: [
      { value: "65%", label: "Cash Flow Management" },
      { value: "70%", label: "Drive Business Expansion" },
      { value: "45%", label: "Streamline payroll processing" },
    ],
    features: [
      { icon: Building2, title: "Startups and Entrepreneurs" },
      { icon: Layers, title: "Cash Flow Management" },
      { icon: CircleDollarSign, title: "Business Expansion" },
      { icon: Briefcase, title: "Payment Solutions" },
    ],
    reversed: true, // This flips the layout for the Business section
  };

  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary">
            Use <span className="text-brand-accent">Cases</span>
          </h2>
          <p className="text-gray-600">
            At Montedeiazzu, we cater to the diverse needs of individuals and
            businesses alike, offering a wide range of financial solutions.
          </p>
        </div>

        {/* Content Rows */}
        <div className="space-y-24">
          <UseCaseRow {...individualsData} />
          <UseCaseRow {...businessData} />
        </div>
      </div>
    </section>
  );
};

export default UseCases;