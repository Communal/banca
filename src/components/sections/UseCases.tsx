import Image from "next/image";
import { User, PiggyBank, Building2, TrendingUp } from "lucide-react";

export default function UseCases() {
  return (
    <section className="text-white py-6 px-4 md:px-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h2 className="text-4xl font-bold text-blue-500 mb-3">Use Cases</h2>
        <p className="text-gray-400 max-w-2xl">
          At YourBank, we cater to the diverse needs of individuals and
          businesses alike, offering a wide range of financial solutions
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Individuals */}
        <UseCaseCard
          image="/images/App.png"
          title="For Individuals"
          features={[
            {
              icon: <User className="w-5 h-5 text-blue-500" />,
              title: "Managing Personal Finances",
              description:
                "Take control of your finances with our comprehensive banking tools and resources.",
            },
            {
              icon: <PiggyBank className="w-5 h-5 text-blue-500" />,
              title: "Saving for the Future",
              description:
                "Build a secure financial future with our high-yield savings accounts.",
            },
          ]}
          progressLabel="Individual Users"
          progressValue={78}
        />

        {/* Businesses */}
        <UseCaseCard
          image="/images/APP2.png"
          title="For Businesses"
          features={[
            {
              icon: <Building2 className="w-5 h-5 text-blue-500" />,
              title: "Startup and Entrepreneurs",
              description:
                "Access the funding and banking services you need to launch and grow your business.",
            },
            {
              icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
              title: "Cash Flow Management",
              description:
                "Streamline your finances with our business banking solutions.",
            },
          ]}
          progressLabel="Business Clients"
          progressValue={63}
        />
      </div>
    </section>
  );
}

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type UseCaseCardProps = {
  image: string;
  title: string;
  features: Feature[];
  progressLabel: string;
  progressValue: number;
};

function UseCaseCard({
  image,
  title,
  features,
  progressLabel,
  progressValue,
}: UseCaseCardProps) {
  return (
    <div className="bg-white text-black rounded-3xl overflow-hidden shadow-xl">
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        <h3 className="text-2xl font-semibold">{title}</h3>

        {/* Features */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-3">
              {feature.icon}
              <div>
                <p className="font-medium">{feature.title}</p>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-blue-600">{progressLabel}</span>
            <span className="text-blue-600">{progressValue}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>

        {/* Button */}
        <button className="w-full py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition">
          Learn More
        </button>
      </div>
    </div>
  );
}
