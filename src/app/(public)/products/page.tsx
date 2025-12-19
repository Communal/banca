"use client";

import { useState } from "react";
import ProductItem from "@/components/sections/products/ProductItem";
import {
  Briefcase,
  CreditCard,
  DollarSign,
  Shield,
  Smartphone,
} from "lucide-react";
import CTABanner from "@/components/sections/CTABanner"; // Reusing your existing CTA

// --- Data Definitions ---
const productsData = {
  Individuals: [
    {
      title: "Checking Accounts",
      description:
        "Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as mobile banking, online bill pay, and debit card access.",
      features: [
        {
          icon: Smartphone,
          title: "Mobile Banking Access",
          desc: "Manage your account on the go with our secure mobile app. Deposit checks, pay bills, and transfer funds effortlessly.",
        },
        {
          icon: Shield,
          title: "Zero Liability Protection",
          desc: "Shop with confidence knowing you are protected against unauthorized purchases with our advanced fraud detection.",
        },
      ],
      requirements: [
        "Valid government-issued photo ID",
        "Minimum opening deposit of $25",
        "Proof of current address (utility bill or lease)",
        "Social Security Number or Tax ID",
      ],
    },
    {
      title: "Savings Accounts",
      description:
        "Build your savings with our competitive interest rates and flexible account options. Whether you are saving for a specific goal or just for a rainy day, we have the right account for you.",
      features: [
        {
          icon: DollarSign,
          title: "High Interest Rates",
          desc: "Watch your money grow faster with our competitive annual percentage yields (APY) on all savings tiers.",
        },
        {
          icon: CreditCard,
          title: "Automatic Transfers",
          desc: "Set up recurring transfers from your checking account to build your savings habit automatically.",
        },
      ],
      requirements: [
        "Valid government-issued photo ID",
        "Minimum opening deposit of $100",
        "Social Security Number or Tax ID",
      ],
    },
    {
      title: "Loans and Mortgages",
      description:
        "Realize your dreams with our flexible loan and mortgage options. From home loans to personal loans, we offer competitive rates and personalized support to help you achieve your goals.",
      features: [
        {
          icon: DollarSign,
          title: "Competitive Rates",
          desc: "Get the best value for your money with our low interest rates and flexible repayment terms tailored to your budget.",
        },
        {
          icon: Briefcase,
          title: "Expert Guidance",
          desc: "Our experienced loan officers will guide you through the application process and help you choose the right loan.",
        },
      ],
      requirements: [
        "Proof of income (pay stubs or tax returns)",
        "Good credit history",
        "Valid government-issued photo ID",
        "Employment verification",
      ],
    },
  ],
  Business: [
    {
      title: "Business Checking",
      description:
        "Streamline your business finances with our robust checking accounts designed for companies of all sizes.",
      features: [
        {
          icon: Smartphone,
          title: "Merchant Services",
          desc: "Accept payments easily with our integrated merchant solutions and point-of-sale systems.",
        },
        {
          icon: Shield,
          title: "Fraud Protection",
          desc: "Advanced security measures to protect your business assets and transactions.",
        },
      ],
      requirements: [
        "Business License / Articles of Incorporation",
        "EIN (Employer Identification Number)",
        "Valid ID for all business owners",
      ],
    },
    {
      title: "Business Savings",
      description:
        "Make your idle cash work for you with our high-yield business savings accounts.",
      features: [
        {
          icon: DollarSign,
          title: "Tiered Interest Rates",
          desc: "Earn higher rates as your balance grows, maximizing your business reserves.",
        },
        {
          icon: CreditCard,
          title: "Liquidity Access",
          desc: "Easy access to funds when you need capital for operational expenses.",
        },
      ],
      requirements: [
        "Business License",
        "Minimum opening deposit of $500",
        "EIN",
      ],
    },
  ],
};

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"Individuals" | "Business">(
    "Individuals"
  );

  return (
    <div className="flex flex-col gap-0 md:gap-8 bg-brand-light min-h-screen">
      {/* --- Header Section --- */}
      <section className="pt-32 pb-12 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="md:w-2/3 space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-primary">
              Our <span className="text-brand-accent">Products</span>
            </h1>
            <p className="text-gray-600 max-w-2xl text-sm md:text-base">
              Discover a range of comprehensive and customizable banking
              products at YourBank, designed to suit your unique financial needs
              and aspirations.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="bg-white p-1.5 rounded-full border border-gray-200 flex shadow-sm mx-auto md:mx-0">
            <button
              onClick={() => setActiveTab("Individuals")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === "Individuals"
                  ? "bg-brand-accent text-white shadow-md"
                  : "text-gray-600 hover:text-brand-primary"
              }`}
            >
              For Individuals
            </button>
            <button
              onClick={() => setActiveTab("Business")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === "Business"
                  ? "bg-brand-accent text-white shadow-md"
                  : "text-gray-600 hover:text-brand-primary"
              }`}
            >
              For Businesses
            </button>
          </div>
        </div>
      </section>

      {/* --- Products List --- */}
      <div className="container mx-auto px-4 flex flex-col gap-20 pb-20">
        {productsData[activeTab].map((product, index) => (
          <ProductItem key={index} {...product} />
        ))}
      </div>

      <CTABanner />
    </div>
  );
}
