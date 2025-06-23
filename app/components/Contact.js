import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Contact = () => {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const shapesRef = useRef(null);
  const formRef = useRef(null);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP animations
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const gsapModule = import("gsap").then(({ default: gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);

          // Animate in the section title
          gsap.fromTo(
            titleRef.current.querySelectorAll(".reveal-text"),
            {
              y: 100,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
              },
            }
          );

          // Animate the decorative shapes
          gsap.fromTo(
            shapesRef.current.querySelectorAll(".shape"),
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              stagger: 0.2,
              duration: 1.5,
              ease: "elastic.out(1, 0.3)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
              },
            }
          );

          // Animate form elements
          gsap.fromTo(
            formRef.current.querySelectorAll(".form-element"),
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: formRef.current,
                start: "top 70%",
              },
            }
          );
        });
      });
    }

    return () => {
      if (typeof window !== "undefined") {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        });
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      id="contact"
    >
      {/* Decorative background elements */}
      <div
        ref={shapesRef}
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      >
        <motion.div
          className="shape absolute top-40 -right-64 w-[30rem] h-[30rem] rounded-full bg-green-50 dark:bg-green-900/10 blur-3xl opacity-50"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
          }}
        ></motion.div>
        <motion.div
          className="shape absolute -bottom-80 -left-40 w-[40rem] h-[40rem] rounded-full bg-emerald-50 dark:bg-emerald-900/10 blur-3xl opacity-50"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${
              mousePosition.y * -20
            }px)`,
          }}
        ></motion.div>

        <svg
          className="shape absolute top-20 left-20 w-40 h-40 text-green-500/5 dark:text-green-400/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M45.3,-51.5C58.3,-42.1,68.7,-26.2,72.7,-8.5C76.7,9.3,74.3,28.9,64.5,43.5C54.7,58.1,37.5,67.7,19.3,71.1C1.2,74.4,-17.9,71.3,-34.1,62.1C-50.3,52.8,-63.7,37.3,-70.4,19.2C-77.1,1.1,-77.1,-19.7,-68.5,-35.3C-59.9,-50.9,-42.6,-61.3,-26,-65.4C-9.5,-69.5,6.4,-67.3,22.1,-62.3C37.9,-57.4,53.6,-49.6,45.3,-51.5Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="shape absolute bottom-40 right-20 w-32 h-32 text-emerald-500/5 dark:text-emerald-400/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M47.7,-57.2C59,-47.3,63.6,-29.7,68.3,-11.1C73,7.5,77.8,27.1,71.2,41.1C64.7,55.2,46.7,63.5,28.9,68.1C11.1,72.7,-6.6,73.5,-23.3,68.5C-39.9,63.4,-55.5,52.4,-64.2,37.1C-72.8,21.8,-74.4,2.1,-69.6,-15.3C-64.8,-32.8,-53.5,-48,-39.7,-57.5C-25.8,-67,-12.9,-70.8,2.8,-74.3C18.6,-77.8,37.1,-80.9,47.7,-57.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          {/* Artistic section title */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 backdrop-blur-sm mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-green-600 dark:bg-green-400 mr-2"></div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Get in Touch
            </span>
          </div>

          <h2 className="relative text-4xl sm:text-5xl font-bold mb-5 overflow-hidden inline-block">
            <span className="reveal-text block">Connect with</span>
            <span className="reveal-text block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-green-400">
              Odo Valley
            </span>
            <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
          </h2>

          <p className="reveal-text max-w-3xl mx-auto text-lg text-white/90 mb-10">
            Ready to experience Ghana&apos;s natural beauty and cultural
            heritage? Reach out to plan your sustainable eco-tourism adventure
            at Odo Valley.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contact information side */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-lg relative overflow-hidden group"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500 to-green-500/0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Contact Phone
                  </h3>
                  <p className="text-gray-600">+233 (0) 24 123-4567</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-lg relative overflow-hidden group"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500 to-green-500/0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Email Address
                  </h3>
                  <p className="text-gray-600">info@odovalley.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-lg relative overflow-hidden group"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500 to-green-500/0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Location
                  </h3>
                  <p className="text-gray-600">Odo Valley Eco-Tourism Center</p>
                  <p className="text-gray-600">Eastern Region, Ghana</p>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <div className="flex justify-center lg:justify-start space-x-4 mt-6">
              {[
                {
                  icon: "M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z",
                  color: "#3B82F6",
                },
                {
                  icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                  color: "#1DA1F2",
                },
                {
                  icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.403 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
                  color: "#E60023",
                },
                {
                  icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                  color: "#833AB4",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600/20 backdrop-blur-md border border-green-400/30 shadow-md"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: social.color }}
                  >
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact form side */}
          <div
            ref={formRef}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>

            <form className="space-y-6 relative z-10">
              <div className="form-element">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 transition-colors duration-200"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="form-element">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-element">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 transition-colors duration-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="booking">Accommodation Booking</option>
                    <option value="restaurant">Restaurant Reservation</option>
                    <option value="farm-tour">Farm Tour Booking</option>
                    <option value="events">Events & Workshops</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>

              <div className="form-element">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 transition-colors duration-200"
                    placeholder="Tell us about your visit to Odo Valley..."
                  ></textarea>
                </div>
              </div>

              <div className="form-element pt-2">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.25)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative overflow-hidden px-6 py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium shadow-lg group"
                >
                  <span className="relative z-10">Send Message</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
