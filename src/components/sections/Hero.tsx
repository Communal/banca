import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
      {/* Left Content */}
      <div className="flex-1 space-y-8 text-left">
        {/* Badge */}
        <div className="inline-flex items-center bg-[#E6F0F4] rounded-full px-4 py-2 text-sm font-medium text-gray-700">
          <span className="bg-brand-accent rounded-full p-1 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          No LLC Required, No Credit Check.
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#1C1C1C]">
          Welcome to Montedeiazzu <br />
          Empowering Your{" "}
          <span className="text-brand-accent">Financial Journey</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 max-w-xl">
          At Montedeiazzu, our mission is to provide comprehensive banking solutions
          that empower individuals and businesses to achieve their financial
          goals. We are committed to delivering personalized and innovative
          services that prioritize our customers' needs.
        </p>

        {/* Button */}
        <Button className="bg-brand-accent hover:bg-blue-700 rounded-full px-8 py-6 text-lg font-medium">
          Open Account
        </Button>
      </div>

      {/* Right Image */}
      <div className="flex-1 relative w-full">

        <Image
          src="/images/Container.png"
          alt="Montedeiazzu Dashboard Mockup"
          width={600}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;