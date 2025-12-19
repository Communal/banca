import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="container mx-auto py-12 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12">
      {/* Left Content */}
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Welcome to YourBank
          <br />
          Empowering Your{" "}
          <span className="text-brand-accent">Financial Journey</span>
        </h1>
        <p className="text-lg opacity-80 max-w-xl mx-auto md:mx-0">
          Experience seamless banking with advanced tools and personalized
          insights designed to help you achieve your financial goals.
        </p>
        <Button className="bg-brand-accent hover:bg-blue-700 rounded-full px-8 py-6 text-lg">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Right Image Placeholder */}
      <div className="flex-1 relative">
        {/* Replace this div with an <Image /> component */}
        <div className="aspect-square md:aspect-4/3 bg-gray-200 rounded-3xl shadow-xl overflow-hidden flex items-center justify-center text-gray-400">
          Hero Image / Dashboard Mockup
        </div>
      </div>
    </section>
  );
};

export default Hero;
