import { Mail, MapPin, Phone, Twitter } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    info: "hello@Montedeiazzu.com",
    desc: "Send us an email anytime, and we'll get back to you within 24 hours.",
  },
  {
    icon: Phone,
    title: "Call Us",
    info: "+234 6677 9999",
    desc: "Our support team is available Mon-Fri from 8am to 5pm.",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    info: "Somewhere in the World",
    desc: "Come say hello at our main office headquarters.",
  },
  {
    icon: Twitter, // Or use a generic 'Message' icon
    title: "Social Media",
    info: "@Montedeiazzu",
    desc: "Follow us for updates and reach out via direct message.",
  },
];

const ContactOptions = () => {
  return (
    <section className="py-12 md:py-20 container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-primary">
          Get in <span className="text-brand-accent">Touch</span>
        </h2>
        <p className="text-gray-600">
          Choose the method that works best for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactMethods.map((method, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-4 group"
          >
            {/* Icon Circle */}
            <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
              <method.icon size={28} />
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-xl text-brand-primary">
                {method.title}
              </h3>
              <p className="text-brand-accent font-medium">{method.info}</p>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed opacity-80">
              {method.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactOptions;