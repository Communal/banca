import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    question: "How do I open an account with Montedeiazzu?",
    answer:
      'Opening an account with Montedeiazzu is easy. Simply visit our website and click on the "Open an Account" button. Follow the prompts, provide the required information, and complete the application process. If you have any questions or need assistance, our customer support team is available to help.',
  },
  {
    question: "What documents do I need to provide to apply for a loan?",
    answer:
      "The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents (such as a passport or driver's license), proof of income (such as pay stubs or tax returns), and information about the collateral (if applicable). Our loan officers will guide you through the specific requirements during the application process.",
  },
  {
    question: "How can I access my accounts online?",
    answer:
      'Accessing your accounts online is simple and secure. Visit our website and click on the "Login" button. Enter your username and password to access your accounts. If you haven\'t registered for online banking, click on the "Enroll Now" button and follow the registration process. If you need assistance, our customer support team is available to guide you.',
  },
  {
    question: "Are my transactions and personal information secure?",
    answer:
      "At Montedeiazzu, we prioritize the security of your transactions and personal information. We employ industry-leading encryption and multi-factor authentication to ensure that your data is protected. Additionally, we regularly update our security measures to stay ahead of emerging threats. You can bank with confidence knowing that we have robust security systems in place.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary">
            Frequently{" "}
            <span className="text-brand-accent">Asked Questions</span>
          </h2>
          <p className="text-gray-600">
            Still you have any questions? Contact our Team via
            support@Montedeiazzu.com
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6"
            >
              <h3 className="text-xl font-semibold text-brand-primary border-b border-gray-100 pb-4">
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="rounded-full px-6 py-5 border-gray-200 text-brand-primary font-medium bg-white hover:bg-gray-50 flex items-center gap-2 shadow-sm"
          >
            Load All FAQ&apos;s <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;