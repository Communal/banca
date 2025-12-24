import Image from "next/image";

const AboutHero = () => {
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
            src="/images/Image.png"
            alt="Montedeiazzu Team"
            fill
            className="object-cover "
            priority
          />
        </div>

        {/* --- Decorative Dot Pattern (Desktop Only) --- */}
        <div className="hidden md:block absolute top-0 right-0 p-8 opacity-40 z-10">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <pattern
              id="dot-pattern-about"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" className="text-white" fill="currentColor" />
            </pattern>
            <rect width="100" height="100" fill="url(#dot-pattern-about)" />
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

          <div>
            <span className="text-gray-800 font-medium text-lg block mb-2">
              Welcome to Montedeiazzu
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1C] mt-2 mb-6 leading-tight">
              Where Banking Meets <br />
              <span className="text-[#2D60FF]">Excellence!</span>
            </h1>
          </div>

          <p className="text-gray-500 leading-relaxed text-sm md:text-base lg:text-lg">
            At Montedeiazzu, we believe that banking should be more than just
            transactions. It should be an experience that empowers individuals
            and businesses to thrive and reach their financial goals. As a
            trusted financial institution, we are committed to delivering
            exceptional banking services that go beyond expectations. With a
            focus on innovation, personalized solutions, and unwavering
            integrity, we strive to provide the best banking experience for our
            valued customers.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutHero;