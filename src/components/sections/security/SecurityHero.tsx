import Image from "next/image";

const SecurityHero = () => {
  return (
    <section className="py-12 md:py-20 container mx-auto px-4">
      {/* Container:
        - Mobile: flex-col (Stacks elements)
        - Desktop: block/relative (Allows absolute positioning of children)
      */}
      <div className="bg-[#1A1A1A] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:block relative min-h-[500px]">
        {/* --- Image Section --- */}
        {/* Mobile: Order-1 (Appears at top), height defined (300px), width full.
           Desktop: Absolute position, Right aligned, 50% width, Full height.
           z-0: Sits behind text on desktop.
        */}
        <div className="order-1 w-full h-[300px] md:absolute md:top-0 md:right-0 md:w-[50%] md:h-full md:order-none z-0">
          <div className="w-full h-full relative">
            <Image
              src="/images/Image57.png"
              alt="Security Priority"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* --- Text Card Section --- */}
        {/* Mobile: Order-2 (Appears below image), full width.
           Desktop: 
             - w-[55%]: Wider than half to create overlap.
             - ml-[5%]: Spaced from left.
             - my-12: Vertical margin makes it shorter than the container/image.
             - relative z-10: Ensures it sits ON TOP of the image layer.
        */}
        <div className="order-2 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-6 rounded-[2rem] md:rounded-[3rem] relative z-10 shadow-xl m-4 md:m-0 md:ml-[5%] md:my-12 md:w-[55%]">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-brand-primary leading-tight">
              Your Security is Our <br />
              <span className="text-brand-accent">Top Priority</span>
            </h1>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
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
