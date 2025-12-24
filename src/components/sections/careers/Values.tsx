const Values = () => {
  const values = [
    {
      title: "Integrity",
      description:
        "We conduct ourselves with utmost honesty, transparency, and ethical behavior. We believe in doing what is right for our customers, colleagues, and stakeholders, even when faced with difficult choices.",
    },
    {
      title: "Customer Centricity",
      description:
        "Our customers are at the heart of everything we do. We are dedicated to understanding their needs, providing personalized solutions, and ensuring exceptional service that exceeds expectations.",
    },
    {
      title: "Collaboration",
      description:
        "We foster a collaborative and inclusive work environment, where teamwork and diversity are celebrated. By leveraging the unique strengths and perspectives of our employees, we drive innovation and achieve greater success together.",
    },
    {
      title: "Innovation",
      description:
        "We embrace change and constantly seek innovative solutions to meet the evolving needs of our customers. We encourage our employees to think creatively, challenge conventions, and explore new ideas to drive the future of banking.",
    },
  ];

  return (
    <section className="py-20 container mx-auto px-4">
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
          Our <span className="text-brand-accent">Values</span>
        </h2>
        <p className="text-gray-600 max-w-3xl">
          At Montedeiazzu, our values form the foundation of our organization and
          guide our actions. We believe in upholding the highest standards of
          integrity, delivering exceptional service, and embracing innovation.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-l-2 border-brand-accent pl-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-brand-primary">
              {value.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;
