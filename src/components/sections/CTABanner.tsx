import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import Link

const CTABanner = () => {
  return (
    <section className="py-20 container mx-auto px-4">
      {/* Updated container classes:
        1. Removed direct bg-image classes.
        2. Added pseudo-element (before:) classes to handle background image and blur.
           - before:blur-[2px] provides the slight blur.
           - before:scale-105 ensures blurred edges are clipped cleanly by overflow-hidden.
           - before:-z-10 places it behind the content.
      */}
      <div className="relative rounded-[2.5rem] p-8 md:p-16 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 text-center lg:text-left before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/cta.png')] before:bg-cover before:bg-center before:bg-no-repeat before:blur-[2px] before:scale-105">

        <div className="absolute top-0 left-0 p-4 sm:p-6 opacity-30 z-0">
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
        {/* z-10 ensures text sits above the blurred background */}
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


        <div className="relative z-10 shrink-0">
          <Link href="/login">
            <Button className="bg-brand-accent hover:bg-blue-600 text-white rounded-full px-8 py-6 text-lg shadow-lg transition-transform hover:scale-105">
              Open Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;