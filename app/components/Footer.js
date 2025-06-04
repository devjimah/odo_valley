import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Destinations",
      links: [
        { name: "Europe", href: "#services" },
        { name: "Asia", href: "#services" },
        { name: "Africa", href: "#services" },
        { name: "Americas", href: "#services" },
        { name: "Oceania", href: "#services" },
      ],
    },
    {
      title: "Travel Types",
      links: [
        { name: "Luxury Tours", href: "#tours" },
        { name: "Adventure Travel", href: "#tours" },
        { name: "Beach Holidays", href: "#tours" },
        { name: "Cultural Experiences", href: "#tours" },
        { name: "Cruises", href: "#tours" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Travel Guide", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Travel Insurance", href: "#" },
        { name: "Visa Information", href: "#" },
      ],
    },
  ];

  const paymentMethods = [
    { name: "Visa", icon: "/visa.svg" },
    { name: "Mastercard", icon: "/mastercard.svg" },
    { name: "American Express", icon: "/amex.svg" },
    { name: "PayPal", icon: "/paypal.svg" },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-2 lg:col-span-1"
          >
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              Odo Travels
            </h2>
            <p className="text-slate-400 mb-6">
              Crafting unforgettable travel experiences since 2013. Let us take
              you on a journey that will create memories to last a lifetime.
            </p>
            <div className="flex space-x-4">
              {["twitter", "facebook", "instagram", "pinterest"].map(
                (social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-slate-800 hover:bg-blue-600 p-2 rounded-full transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  </motion.a>
                )
              )}
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">
                Our Certifications
              </h4>
              <div className="flex space-x-4">
                <Image
                  src="/certified-travel.svg"
                  alt="Certified Travel"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
              </div>
            </div>
          </motion.div>

          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * sectionIndex }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * linkIndex }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 mb-8">
          <h4 className="text-center text-sm font-semibold text-slate-300 mb-4">
            Secure Payment Options
          </h4>
          <div className="flex justify-center space-x-6">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="bg-slate-800 rounded-md p-2 w-12 h-8 flex items-center justify-center"
              >
                <span className="text-xs text-slate-300">
                  {method.name.substring(0, 4)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Odo Travels. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
