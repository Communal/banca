import Image from "next/image";

const SecurityHero = () => {
  return (
    <section className="py-8 md:py-20 container mx-auto px-4">
      {/* Main Container 
        - Mobile: Flex Column (stacks vertical)
        - Desktop: Block/Relative (allows absolute positioning for overlap)
      */}
      <div className="flex flex-col md:block relative bg-[#1C1C1C] md:bg-transparent rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-auto md:min-h-150">

        {/* --- Background Image Section --- */}
        {/* - Mobile: Relative, fixed height (h-64), takes up top space naturally
           - Desktop: Absolute, full height, pushes to right side
        */}
        <div className="relative w-full h-64 md:absolute md:top-0 md:right-0 md:w-[60%] md:h-full md:rounded-[3rem] overflow-hidden">
          <Image
            src="/images/Image57.png"
            alt="Security Priority"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* --- Decorative Dot Pattern (Desktop Only) --- */}
        <div className="hidden md:block absolute top-0 right-0 p-8 opacity-40 z-10">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <pattern
              id="dot-pattern-security"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" className="text-white" fill="currentColor" />
            </pattern>
            <rect width="100" height="100" fill="url(#dot-pattern-security)" />
          </svg>
        </div>

        {/* --- White Content Card --- */}
        {/* - Mobile: Standard block, white background, rounded corners
           - Desktop: Relative, floats to left, overlaps the image background
        */}
        <div className="relative z-20 bg-white p-8 md:p-16 
                        rounded-[2rem] md:rounded-[3rem] 
                        w-full md:w-[50%] lg:w-[48%] 
                        md:ml-12 md:mt-24 
                        shadow-none md:shadow-2xl">

          <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-[#1C1C1C] mb-6 leading-tight">
            Your Security is Our <br />
            <span className="text-[#2D60FF]">Top Priority</span>
          </h1>

          <p className="text-gray-500 leading-relaxed text-sm md:text-base lg:text-lg">
            At YourBank, we understand the importance of keeping your financial
            information secure. We employ robust security measures and advanced
            technologies to protect your personal and financial data. Rest
            assured that when you bank with us, your security is our utmost
            priority.
          </p>
        </div>

      </div>
    </section>
  );
};

export default SecurityHero;