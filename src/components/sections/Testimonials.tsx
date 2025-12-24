"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Data ---
const testimonialsData = [
  {
    type: "Individuals",
    quote:
      "Montedeiazzu has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
    author: "Sara T",
  },
  {
    type: "Businesses",
    quote:
      "I recently started my own business, and Montedeiazzu has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
    author: "John D",
  },
  {
    type: "Individuals",
    quote:
      "I love the convenience of Montedeiazzu's mobile banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.",
    author: "Emily G",
  },
  // Add more business testimonials for a complete set
  {
    type: "Businesses",
    quote:
      "Montedeiazzu's business tools have streamlined our payroll and invoicing, saving us countless hours. We can now focus on growing our company.",
    author: "Michael R",
  },
  {
    type: "Businesses",
    quote:
      "The business loan process was incredibly smooth. The team at Montedeiazzu understood our vision and provided the capital we needed to expand our operations.",
    author: "David K",
  },
];

// --- Sub-Component: Testimonial Card ---
const TestimonialCard = ({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) => (
  <div className="flex flex-col items-center text-center space-y-8">
    {/* Quote Icon with Lines */}
    <div className="relative w-full flex justify-center items-center">
      <div className="h-px bg-gray-300 w-1/4 md:w-1/3 absolute left-0"></div>
      <Quote className="text-brand-accent w-10 h-10 fill-current z-10 bg-brand-light px-1" />
      <div className="h-px bg-gray-300 w-1/4 md:w-1/3 absolute right-0"></div>
    </div>
    <p className="text-gray-700 leading-relaxed text-lg md:text-xl max-w-2xl">
      {quote}
    </p>
    <span className="font-bold text-brand-accent text-xl">{author}</span>
  </div>
);

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState<"Individuals" | "Businesses">(
    "Individuals"
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredTestimonials = testimonialsData.filter(
    (t) => t.type === activeTab
  );

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length
    );
  };

  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-4">
        {/* --- Header & Toggle Section --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16">
          {/* Header Text */}
          <div className="text-center lg:text-left max-w-3xl space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary">
              Our <span className="text-brand-accent">Testimonials</span>
            </h2>
            <p className="text-gray-600">
              Discover how Montedeiazzu has transformed lives with innovative
              digital solutions and personalized customer service. See why our
              clients trust us for a secure and prosperous financial journey.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="bg-white p-1 rounded-full border border-gray-100 flex shadow-sm">
            <button
              onClick={() => {
                setActiveTab("Individuals");
                setCurrentIndex(0);
              }}
              className={`px-8 py-3 rounded-full text-base font-medium transition-colors ${
                activeTab === "Individuals"
                  ? "bg-brand-accent text-white"
                  : "text-gray-600 hover:text-brand-primary"
              }`}
            >
              For Individuals
            </button>
            <button
              onClick={() => {
                setActiveTab("Businesses");
                setCurrentIndex(0);
              }}
              className={`px-8 py-3 rounded-full text-base font-medium transition-colors ${
                activeTab === "Businesses"
                  ? "bg-brand-accent text-white"
                  : "text-gray-600 hover:text-brand-primary"
              }`}
            >
              For Businesses
            </button>
          </div>
        </div>

        {/* --- Testimonials Content --- */}

        {/* Mobile View (Carousel) */}
        <div className="lg:hidden flex flex-col items-center">
          {filteredTestimonials.length > 0 && (
            <TestimonialCard {...filteredTestimonials[currentIndex]} />
          )}

          {/* Navigation Arrows */}
          <div className="flex gap-6 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full w-14 h-14 border-gray-300 text-brand-accent hover:bg-white hover:text-brand-primary"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full w-14 h-14 border-gray-300 text-brand-accent hover:bg-white hover:text-brand-primary"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Desktop View (Grid) */}
        <div className="hidden lg:grid grid-cols-3 gap-12 items-start relative">
          {/* Desktop Navigation Arrows (Optional, based on image) */}
          <div className="absolute top-1/2 -left-20 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full w-14 h-14 border-gray-300 text-brand-accent bg-brand-light hover:bg-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>

          {/* Display first 3 items from filtered list */}
          {filteredTestimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}

          <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full w-14 h-14 border-gray-300 text-brand-accent bg-brand-light hover:bg-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;