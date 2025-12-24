"use client";

import { ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Data Structure for Content ---
const featuresData = {
  online: [
    {
      title: "24/7 Account Access",
      description:
        "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.",
    },
    {
      title: "Mobile Banking App",
      description:
        "Stay connected to your finances on the go with our user-friendly mobile banking app. Easily manage your accounts, deposit checks, and make payments from your smartphone or tablet.",
    },
    {
      title: "Secure Transactions",
      description:
        "Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.",
    },
    {
      title: "Bill Pay and Transfers",
      description:
        "Save time and avoid late fees with our convenient bill pay service. Set up recurring payments or make one-time transfers between your accounts with just a few clicks.",
    },
  ],
  tools: [
    {
      title: "Budgeting Tools",
      description:
        "Track your spending and set customized budgets to stay on top of your finances. Visualize your expenses with easy-to-read charts.",
    },
    {
      title: "Savings Goals",
      description:
        "Set specific savings targets for vacations, emergency funds, or big purchases and track your progress automatically.",
    },
    {
      title: "Investment Tracker",
      description:
        "Monitor your investment portfolio in real-time and get insights to optimize your asset allocation.",
    },
    {
      title: "Financial Calculators",
      description:
        "Use our built-in mortgage, loan, and retirement calculators to make informed financial decisions.",
    },
  ],
  support: [
    {
      title: "Live Chat Support",
      description:
        "Connect with our support team instantly via live chat for quick resolutions to your queries.",
    },
    {
      title: "24/7 Phone Support",
      description:
        "Speak directly with a representative at any time of day or night for urgent banking needs.",
    },
    {
      title: "Help Center",
      description:
        "Access a comprehensive library of FAQs, tutorials, and guides to help you navigate our services.",
    },
    {
      title: "Branch Locator",
      description:
        "Find the nearest branch or ATM quickly with our integrated map and location services.",
    },
  ],
};

const Features = () => {
  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center md:text-left md:max-w-4xl mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary">
            Our <span className="text-brand-accent">Features</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Experience a host of powerful features at Montedeiazzu, including
            seamless online banking, secure transactions, and personalized
            financial insights, all designed to enhance your banking experience.
          </p>
        </div>

        {/* Tabs Component */}
        <Tabs defaultValue="online" className="flex flex-col lg:flex-row gap-8">
          {/* --- Sidebar Navigation (Tabs) --- */}
          <div className="lg:w-1/3">
            <TabsList className="flex flex-row lg:flex-col h-auto w-full bg-white p-4 rounded-2xl gap-4 overflow-x-auto lg:overflow-visible shadow-sm border border-gray-100">
              <TabsTrigger
                value="online"
                className="w-full justify-center lg:justify-start py-3 px-6 text-base rounded-full data-[state=active]:bg-brand-light data-[state=active]:text-brand-accent data-[state=active]:shadow-none border border-transparent data-[state=active]:border-gray-200"
              >
                Online Banking
              </TabsTrigger>

              <TabsTrigger
                value="tools"
                className="w-full justify-center lg:justify-start py-3 px-6 text-base rounded-full data-[state=active]:bg-brand-light data-[state=active]:text-brand-accent data-[state=active]:shadow-none border border-transparent data-[state=active]:border-gray-200"
              >
                Financial Tools
              </TabsTrigger>

              <TabsTrigger
                value="support"
                className="w-full justify-center lg:justify-start py-3 px-6 text-base rounded-full data-[state=active]:bg-brand-light data-[state=active]:text-brand-accent data-[state=active]:shadow-none border border-transparent data-[state=active]:border-gray-200"
              >
                Customer Support
              </TabsTrigger>
            </TabsList>
          </div>

          {/* --- Content Area (Grid) --- */}
          <div className="flex-1">
            {Object.entries(featuresData).map(([key, items]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-brand-primary">
                          {item.title}
                        </h3>
                        <ArrowUpRight className="text-brand-accent w-6 h-6" />
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default Features;