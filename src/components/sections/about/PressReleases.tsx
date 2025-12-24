import Image from "next/image";

const pressData = [
  {
    title:
      "Montedeiazzu Launches New Rewards Program to Enhance Customer Loyalty and Satisfaction",
    location: "India",
    date: "24/12/2024",
    description:
      "Montedeiazzu is pleased to announce the introduction of our new Rewards Program, aimed at rewarding our loyal customers and enhancing their banking experience. The program offers exclusive benefits, discounts, and personalized offers tailored to individual customer preferences.",
    image: "/images/Image-3.png", // Place your first image here
  },
  {
    title:
      "Montedeiazzu Expands Branch Network with Opening of New Location in Chennai",
    location: "India",
    date: "12/01/2024",
    description:
      "Montedeiazzu is excited to announce the grand opening of our newest branch in Chennai. This expansion is a testament to our continued commitment to serving our customers and providing them with convenient access to our comprehensive range of banking services.",
    image: "/images/Image-4.png", // Place your second image here
  },
  {
    title:
      "Montedeiazzu Partners with Local Nonprofit to Support Financial Education Initiatives",
    location: "India",
    date: "20/12/2024",
    description:
      "Montedeiazzu has partnered with a local nonprofit organization to support financial education initiatives in the community. Through this partnership, we aim to empower individuals with the knowledge and tools they need to make informed financial decisions.",
    image: "/images/Image-5.png", // Place your third image here
  },
  {
    title:
      "Montedeiazzu Launches Sustainable Banking Initiative to Promote Environmental Responsibility",
    location: "India",
    date: "28/12/2024",
    description:
      "Montedeiazzu is dedicated to promoting environmental responsibility and sustainability. We are launching a new initiative to support green projects and provide financing for eco-friendly businesses, reinforcing our commitment to a greener future.",
    image: "/images/Image-6.png", // Place your fourth image here
  },
];

const PressReleases = () => {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-primary mb-4">
          Press <span className="text-brand-accent">Releases</span>
        </h2>
        <p className="text-gray-600">
          Stay updated with the latest happenings and exciting developments at
          Montedeiazzu through our press releases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pressData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-sm"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-200">
              {/* Using simple img tag as placeholder if Next/Image isn't set up for external domains yet, 
                  but recommended to use <Image /> with your local files. 
               */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-medium text-brand-primary leading-tight">
                {item.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1 rounded-full border border-gray-200 text-gray-500 text-sm bg-gray-50">
                  Location: {item.location}
                </span>
                <span className="px-4 py-1 rounded-full border border-gray-200 text-gray-500 text-sm bg-gray-50">
                  Date: {item.date}
                </span>
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PressReleases;
