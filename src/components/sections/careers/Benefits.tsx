import { Briefcase, HeartPulse, GraduationCap, Scale } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Scale, // Represents Competitive Compensation
      title: "Competitive Compensation",
      description:
        "We provide a competitive salary package that recognizes the skills and expertise of our employees. Montedeiazzu believes in rewarding exceptional performance and offering opportunities for financial growth.",
    },
    {
      icon: HeartPulse, // Represents Health and Wellness
      title: "Health and Wellness",
      description:
        "We prioritize the health and well-being of our employees by providing comprehensive medical, dental, and vision insurance plans. We also offer wellness programs, gym memberships, and resources to support a healthy lifestyle.",
    },
    {
      icon: Briefcase, // Represents Retirement Planning (or PiggyBank)
      title: "Retirement Planning",
      description:
        "Montedeiazzu is committed to helping employees plan for their future. We offer a generous retirement savings plan with employer matches to help team members build a secure financial foundation.",
    },
    {
      icon: GraduationCap, // Represents Work-Life Balance (or Sun/Coffee icon)
      title: "Work-Life Balance",
      description:
        "We understand the importance of maintaining a healthy work-life balance. Montedeiazzu offers flexible work arrangements, paid time off, parental leave, and other programs to support employees in managing their personal and professional commitments.",
    },
  ];

  return (
    <section className="py-20 container mx-auto px-4">
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
          Our <span className="text-brand-accent">Benefits</span>
        </h2>
        <p className="text-gray-600 max-w-3xl">
          At Montedeiazzu, we value our employees and are dedicated to their
          well-being and success. We offer a comprehensive benefits package
          designed to support their health, financial stability, and career
          growth.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start gap-6"
          >
            {/* Icon Circle */}
            <div className="bg-brand-light p-4 rounded-full text-brand-accent">
              <benefit.icon size={32} />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-primary mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
