import { Fingerprint, Globe, Smartphone, View } from "lucide-react";

const SecurityProtection = () => {
  const protections = [
    {
      icon: Globe, // Representing Online Platform
      title: "Secure Online Banking Platform",
      description:
        "Our online banking platform is built with multiple layers of security to safeguard your information. We utilize industry-standard encryption protocols to ensure that your data remains confidential and protected during transmission.",
    },
    {
      icon: Fingerprint, // Representing MFA
      title: "Multi-Factor Authentication",
      description:
        "To enhance the security of your online banking experience, we employ multi-factor authentication. This additional layer of security requires you to provide multiple pieces of identification, such as a password and a one-time verification code, to access your account.",
    },
    {
      icon: View, // Representing Monitoring
      title: "Fraud Monitoring",
      description:
        "We have sophisticated fraud detection systems in place to monitor your accounts for any suspicious activities. Our dedicated team works around the clock to detect and prevent unauthorized transactions, providing you with peace of mind.",
    },
    {
      icon: Smartphone, // Representing Mobile
      title: "Secure Mobile Banking",
      description:
        "Our mobile banking app is designed with the same level of security as our online banking platform. You can confidently access your accounts, make transactions, and manage your finances on the go, knowing that your information is protected.",
    },
  ];

  return (
    <section className="py-20 container mx-auto px-4">
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-primary mb-4">
          How We <span className="text-brand-accent">Protect You</span>
        </h2>
        <p className="text-gray-600 max-w-3xl">
          At Montedeiazzu, we prioritize the security and confidentiality of your
          financial information. Our state-of-the-art encryption technology and
          stringent data protection measures ensure your assets and transactions
          are safeguarded at all times.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {protections.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6"
          >
            {/* Header: Icon + Title */}
            <div className="flex items-center gap-4">
              <div className="bg-brand-light p-4 rounded-full text-brand-accent">
                <item.icon size={28} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-primary">
                {item.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecurityProtection;
