import { Briefcase } from "lucide-react";

interface ProductItemProps {
  title: string;
  description: string;
  features: {
    icon: React.ElementType;
    title: string;
    desc: string;
  }[];
  requirements: string[];
}

const ProductItem = ({
  title,
  description,
  features,
  requirements,
}: ProductItemProps) => {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row gap-6 md:items-end">
        <h2 className="text-2xl md:text-4xl font-bold text-brand-primary shrink-0">
          {title}
        </h2>
        <p className="text-gray-600 text-sm md:text-base border-l-2 border-gray-200 pl-4 md:max-w-3xl">
          {description}
        </p>
      </div>

      {/* Main Content Container (Tabs-like look) */}
      <div className="flex flex-col">
        {/* Top Part: Features (Side by Side on Desktop) */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex-1 bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="bg-brand-light/50 p-3 rounded-full text-brand-accent border border-brand-accent/10">
                  <feature.icon size={24} />
                </div>
                {/* Optional: Add decorative icon or arrow here if needed */}
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Part: Requirements */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-brand-primary mb-6">
            Requirements
          </h3>

          <div className="flex flex-col gap-4">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-brand-light rounded-full text-brand-accent shrink-0">
                  <Briefcase size={14} strokeWidth={2.5} />
                </div>
                <span className="text-gray-600 text-sm md:text-base">
                  {req}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
