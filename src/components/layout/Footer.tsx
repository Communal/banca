import Link from "next/link";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Careers", href: "#" },
    { name: "About", href: "#" },
    { name: "Security", href: "#" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@gmail.com" },
    { icon: Phone, text: "+234 6677 9999" },
    { icon: MapPin, text: "Somewhere in the World" },
  ];

  return (
    <footer className="bg-brand-light pt-20 pb-10">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* --- Logo Section --- */}
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-brand-accent text-white p-1.5 rounded-sm flex items-center justify-center">
            {/* CSS Logo Representation */}
            <div className="w-5 h-5 relative">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white"></div>
              <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-white rotate-45"></div>
            </div>
          </div>
          <span className="font-bold text-xl text-brand-primary tracking-tight">
            YourBanK
          </span>
        </div>

        {/* --- Navigation Links --- */}
        <nav className="flex gap-6 md:gap-8 font-medium text-brand-primary mb-8 text-sm md:text-base">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-brand-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-8 max-w-7xl" />

        {/* --- Contact Info --- */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-brand-primary"
            >
              <item.icon className="w-5 h-5 text-brand-accent fill-current" />
              <span className="text-sm md:text-base">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-8 max-w-7xl" />

        {/* --- Bottom Bar / Card --- */}
        {/* Desktop: White pill-shaped bar.
            Mobile: Bordered rounded card with specific padding.
        */}
        <div className="w-full max-w-7xl bg-transparent md:bg-white md:rounded-full md:px-4 md:py-4 md:flex md:justify-between md:items-center relative">
          {/* Mobile Container Wrapper (Bordered Card) */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-0 bg-[#1A1A1A] md:bg-transparent rounded-3xl p-8 md:p-0 md:border-none border border-gray-800 md:text-gray-500 text-gray-400">
            {/* 1. Social Icons */}
            {/* Mobile: Centered at top. Desktop: Left aligned. */}
            <div className="flex gap-3 md:order-1 -mt-12 md:mt-0 bg-brand-light md:bg-transparent px-4 py-2 md:p-0 rounded-full md:rounded-none">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <social.icon
                    size={20}
                    fill="currentColor"
                    className="stroke-none"
                  />
                </Link>
              ))}
            </div>

            {/* 2. Copyright */}
            {/* Mobile: Center. Desktop: Center absolute or flex. */}
            <div className="text-sm text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:order-2 text-gray-500 md:text-gray-500">
              YourBank All Rights Reserved
            </div>

            {/* 3. Legal Links */}
            {/* Mobile: Bottom. Desktop: Right aligned. */}
            <div className="flex gap-4 text-sm md:order-3 text-gray-500">
              <Link href="#" className="hover:text-brand-accent">
                Privacy Policy
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="#" className="hover:text-brand-accent">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;