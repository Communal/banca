import Image from "next/image";

const AboutHero = () => {
  return (
    <section className="py-12 md:py-20 container mx-auto px-4">
      {/* Container:
        - Mobile: Flex-col (stacked)
        - Desktop: Flex-row (side-by-side) with relative positioning to handle overlap if needed
        - Rounded corners matching design
      */}
      <div className="bg-[#1A1A1A] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-stretch min-h-125">
        {/* --- Left Side: White Text Card --- */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center gap-6 md:w-[60%] lg:w-[55%] z-10 md:rounded-r-[3rem] md:my-8 md:ml-8 md:rounded-[3rem]">
          <div>
            <span className="text-gray-800 font-medium text-lg">
              Welcome to YourBank
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-primary mt-2">
              Where Banking Meets{" "}
              <span className="text-brand-accent">Excellence!</span>
            </h1>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            At YourBank, we believe that banking should be more than just
            transactions. It should be an experience that empowers individuals
            and businesses to thrive and reach their financial goals. As a
            trusted financial institution, we are committed to delivering
            exceptional banking services that go beyond expectations. With a
            focus on innovation, personalized solutions, and unwavering
            integrity, we strive to provide the best banking experience for our
            valued customers. Join us on this exciting journey and discover a
            new level of banking excellence.
          </p>
        </div>

        {/* --- Right Side: Image --- */}
        {/* On Mobile, this comes first or second depending on design preference. 
            In your mobile screenshot, the image is on Top. We can use 'order-first' on mobile to push it up.
        */}
        <div className="relative w-full md:flex-1 min-h-75 md:min-h-auto order-first md:order-last">
          {/* Placeholder Image - Grayscale Effect applied via style or class */}
          <div className="absolute inset-0 bg-gray-300">
            {/* Replace with <Image /> component */}
            <Image
              src="/images/Image.png"
              alt="YourBank Team"
              fill
              className="object-cover filter grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
