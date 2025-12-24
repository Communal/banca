import Image from "next/image";

const MissionSection = () => {
  return (
    <section className="py-20 container mx-auto px-4">
      {/* Main Heading */}
      <div className="mb-16 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-primary mb-4">
          Mission & <span className="text-brand-accent">Vision</span>
        </h2>
        <p className="text-gray-600 max-w-3xl">
          We envision being a leading force in the industry, driven by
          innovation, integrity, and a commitment to excellence.
        </p>
      </div>

      <div className="space-y-20 md:space-y-24">
        {/* --- MISSION BLOCK --- */}
        {/* Layout: Image Left, Text Right */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
          {/* Image Container with Decoration */}
          <div className="w-full md:w-1/2 relative">
            {/* Decorative Dot Pattern Top-Left */}
            <div className="absolute -top-4 -left-4 w-full h-full border-t border-l border-brand-light/0 rounded-tl-[3rem] z-0">
              <svg
                width="100"
                height="100"
                className="absolute -top-6 -left-6 opacity-30"
              >
                <pattern
                  id="dots-mission"
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
                    className="text-gray-400"
                    fill="currentColor"
                  />
                </pattern>
                <rect width="100" height="100" fill="url(#dots-mission)" />
              </svg>
            </div>

            {/* The Image Box - Unique Shape: Top-Left & Bottom-Right Rounded */}
            <div className="relative bg-gray-200 aspect-[4/3] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg overflow-hidden shadow-sm z-10">
              <Image
                src="/images/Image-1.png"
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold text-brand-primary">Mission</h3>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              At Montedeiazzu, our mission is to empower our customers to achieve
              their financial goals. We are dedicated to delivering exceptional
              banking solutions that cater to their unique needs. Through
              personalized services, expert guidance, and cutting-edge
              technology, we aim to build strong, lasting relationships with our
              customers. Our mission is to be their trusted partner, helping
              them navigate their financial journey and realize their dreams.
            </p>
          </div>
        </div>

        {/* --- VISION BLOCK --- */}
        {/* Layout: Image Right, Text Left (Reversed on Desktop) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20">
          {/* Image Container */}
          <div className="w-full md:w-1/2 relative">
            {/* Decorative Dot Pattern Top-Right */}
            <div className="absolute -top-4 -right-4 w-full h-full z-0">
              <svg
                width="100"
                height="100"
                className="absolute -top-6 -right-6 opacity-30"
              >
                <pattern
                  id="dots-vision"
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
                    className="text-gray-400"
                    fill="currentColor"
                  />
                </pattern>
                <rect width="100" height="100" fill="url(#dots-vision)" />
              </svg>
            </div>

            {/* The Image Box - Unique Shape: Top-Right & Bottom-Left Rounded (Opposite of Mission) */}
            <div className="relative bg-gray-200 aspect-[4/3] rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-lg rounded-br-lg overflow-hidden shadow-sm z-10">
              <Image
                src="/images/Image-2.png"
                alt="Our Vision"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold text-brand-primary">Vision</h3>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Our vision at Montedeiazzu is to redefine banking by creating a
              seamless and personalized experience for our customers. We
              envision a future where banking is accessible, transparent, and
              tailored to individual preferences. Through continuous innovation
              and collaboration, we strive to be at the forefront of the
              industry, setting new standards for customer-centric banking. Our
              vision is to be the preferred financial institution, known for our
              unwavering commitment to excellence and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
