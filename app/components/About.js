import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const contentRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // GSAP animations will be initialized client-side only
    if (typeof window !== "undefined") {
      const gsapModule = import("gsap").then(({ default: gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);

          // Parallax effect for the background image
          gsap.fromTo(
            parallaxRef.current,
            { y: 0 },
            {
              y: 100,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );

          // Animate content when in view
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 80%",
              },
            }
          );
        });
      });
    }

    return () => {
      // Cleanup will happen client-side only
      if (typeof window !== "undefined") {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        });
      }
    };
  }, []);

  const counterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.8,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      id="about"
    >
      {/* Parallax Background */}
      <div ref={parallaxRef} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-teal-500/20 dark:from-blue-900/30 dark:to-teal-900/30" />
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 dark:opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                About{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Odo Travels
                </span>
              </h2>

              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
                For over a decade, Odo Travels has been crafting extraordinary
                journeys for travelers seeking authentic experiences around the
                globe. Our passion for travel and commitment to excellence
                drives everything we do.
              </p>

              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
                We believe travel should be transformative, creating memories
                that last a lifetime. Our team of experienced travel specialists
                personally visits each destination to ensure we provide
                knowledgeable recommendations and seamless planning.
              </p>

              <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
                Whether you're looking for a relaxing beach retreat, an
                adventurous expedition, or a cultural immersion, we tailor each
                journey to your preferences while maintaining our commitment to
                responsible tourism.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium transition-colors"
              >
                Our Travel Philosophy
              </motion.button>
            </motion.div>
          </div>

          {/* Stats */}
          <div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: "10+", label: "Years of Experience" },
                { value: "50+", label: "Destinations" },
                { value: "12,000+", label: "Happy Travelers" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={counterAnimation}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg"
                >
                  <h3 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                Our Travel Certifications
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {["IATA", "ASTA", "CLIA", "Green Globe"].map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400"
                  >
                    {cert}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
