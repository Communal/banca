
const CareersHero = () => {
  return (
    <section className="py-12 md:py-20 container mx-auto px-4">
      <div className="relative bg-[#1A1A1A] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 overflow-hidden flex flex-col md:flex-row items-center justify-end min-h-[600px] md:min-h-[500px]">
        {/* --- Background Image / Right Side --- */}
        {/* In a real app, use <Image /> from next/image. 
            Here we simulate the photo of people working with a div placeholder. 
        */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-1/2 md:h-full bg-gray-800">
          {/* Placeholder for the image of people working */}
          <div className="w-full h-full opacity-50 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        </div>

        {/* --- Decorative Abstract Shapes (Optional based on design) --- */}
        <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
          <svg width="150" height="150" viewBox="0 0 100 100">
            <pattern
              id="dot-pattern-hero"
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
                className="text-white"
                fill="currentColor"
              />
            </pattern>
            <rect width="100" height="100" fill="url(#dot-pattern-hero)" />
          </svg>
        </div>

        {/* --- Floating White Card (Left Content) --- */}
        {/* On Desktop: Absolute positioned or flex-aligned to the left, overlapping the background.
            On Mobile: Stacked relative, pulled up slightly to overlap or just sitting on top.
        */}
        <div className="relative z-10 bg-white rounded-3xl p-8 md:p-12 lg:p-16 max-w-2xl w-full mr-auto shadow-xl mt-48 md:mt-0 md:-ml-8 lg:ml-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6">
            Welcome to <br />
            <span className="text-brand-accent">YourBank</span> Careers!
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-0">
            Join our team and embark on a rewarding journey in the banking
            industry. At YourBank, we are committed to fostering a culture of
            excellence and providing opportunities for professional growth. With
            a focus on innovation, customer service, and integrity, we strive to
            make a positive impact in the lives of our customers and
            communities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
