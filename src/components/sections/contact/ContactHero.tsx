import { Button } from "@/components/ui/button";

const ContactHero = () => {
  return (
    <section className="pt-32 pb-12 container mx-auto px-4">
      {/* Main Card Container */}
      <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden shadow-sm border border-gray-100">
        {/* Decorative Dot Pattern (Top Right) */}
        <div className="absolute top-0 right-0 p-6 opacity-40 hidden lg:block">
          <svg width="100" height="100" fill="none">
            <defs>
              <pattern
                id="dot-pattern-contact"
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
                  className="text-brand-accent"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dot-pattern-contact)" />
          </svg>
        </div>

        {/* Left: Text Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary">
            <span className="text-brand-accent">Contact</span> Us
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Have questions or need assistance? We are here to help. Reach out to
            our dedicated support team via email, phone, or visit one of our
            branches. We look forward to hearing from you!
          </p>
          <div className="pt-4">
            <Button className="bg-brand-accent hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg">
              Get Support
            </Button>
          </div>
        </div>

        {/* Right: Image Area */}
        {/* Matching the style of the Careers Hero image */}
        <div className="flex-1 w-full relative">
          <div className="aspect-[4/3] md:aspect-[16/9] lg:aspect-square bg-gray-900 rounded-[2rem] overflow-hidden relative">
            {/* Abstract overlay pattern or Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-80"></div>

            {/* Placeholder for actual image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <span className="text-center px-4">
                [Insert Office/Support Team Image Here] <br />
                (Matches style of image_9b7c3f.jpg)
              </span>
            </div>

            {/* Decorative abstract shapes (simulating the image texture) */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;