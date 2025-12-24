import { Button } from "@/components/ui/button";

const CTABanner = () => {
  return (
    <section className="py-20 container mx-auto px-4">
<div className="relative bg-[url('/images/cta.png')] bg-cover bg-center bg-no-repeat rounded-[2.5rem] p-8 md:p-16 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 text-center lg:text-left">        {/* --- Decorative Dot Pattern (Top Left) --- */}
        <div className="absolute top-0 left-0 p-4 sm:p-6 opacity-30">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dot-pattern-cta"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="2"
                  y="2"
                  width="2"
                  height="2"
                  className="text-gray-500"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#dot-pattern-cta)" />
          </svg>
        </div>

        {/* --- Text Content --- */}
        <div className="relative z-10 max-w-2xl space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Start your financial journey with{" "}
            <span className="text-brand-accent">Montedeiazzu today!</span>
          </h2>
          <p className="text-white leading-relaxed text-base md:text-lg">
            Lorem ipsum dolor sit amet consectetur. Blandit odio semper risus
            pellentesque elit. Pellentesque eget ut imperdiet nulla penatibus.
            Nascetur viverra arcu sed amet cursus purus.
          </p>
        </div>

        {/* --- Action Button --- */}
        <div className="relative z-10 shrink-0">
          <Button className="bg-brand-accent hover:bg-blue-600 text-white rounded-full px-8 py-6 text-lg shadow-lg transition-transform hover:scale-105">
            Open Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;