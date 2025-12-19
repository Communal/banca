import { Button } from "@/components/ui/button";
import { Briefcase, PiggyBank, Wallet } from "lucide-react";

const Products = () => {
  const products = [
    {
      icon: Wallet,
      title: "Checking Accounts",
      desc: "Enjoy fee-free banking with access to nationwide ATMs and digital tools.",
    },
    {
      icon: PiggyBank,
      title: "Savings Accounts",
      desc: "Grow your money faster with high-yield savings options and automatic tools.",
    },
    {
      icon: Briefcase,
      title: "Business Banking",
      desc: "Scalable solutions for businesses of all sizes to manage finances efficiently.",
    },
  ];

  return (
    <section className="container mx-auto py-16 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our <span className="text-brand-accent">Products</span>
          </h2>
          <p className="text-lg opacity-80 max-w-2xl">
            Discover a range of financial products tailored to your needs.
          </p>
        </div>
        {/* Placeholder for the Toggle */}
        <div className="bg-white p-1 rounded-full border flex">
          <Button
            variant="ghost"
            className="rounded-full bg-brand-accent text-white"
          >
            For Individuals
          </Button>
          <Button variant="ghost" className="rounded-full">
            For Businesses
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4"
          >
            <div className="p-4 bg-brand-light rounded-full text-brand-accent">
              <item.icon size={32} />
            </div>
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="opacity-70">{item.desc}</p>
            <Button variant="link" className="text-brand-accent mt-auto">
              Learn More
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
