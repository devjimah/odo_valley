import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const testimonials = [
  {
    id: 1,
    name: "Emma Thompson",
    role: "Adventure Enthusiast",
    image: "https://picsum.photos/id/1027/100/100",
    content:
      "The artistic approach to travel completely transformed my experience. Every destination was carefully curated to provide both visual beauty and cultural depth. The attention to detail was remarkable!",
    location: "Paris, France",
    rating: 5,
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Photography Lover",
    image: "https://picsum.photos/id/1012/100/100",
    content:
      "As someone who travels primarily for photography, I was blown away by the artistic considerations in each location. The guides knew exactly where to be at the perfect time for magical lighting and compositions.",
    location: "Kyoto, Japan",
    rating: 5,
    color: "#8B5CF6",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "Cultural Explorer",
    image: "https://picsum.photos/id/1014/100/100",
    content:
      "The blend of luxury and authentic cultural experiences was perfect. I've never felt so immersed in the local arts and traditions while still enjoying premium accommodations and service.",
    location: "Marrakech, Morocco",
    rating: 4,
    color: "#EC4899",
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Luxury Traveler",
    image: "https://picsum.photos/id/1025/100/100",
    content:
      "Every aspect of my journey was infused with creativity and artistic flair. From the hand-selected boutique hotels to the curated dining experiences, it was like traveling through a living gallery.",
    location: "Santorini, Greece",
    rating: 5,
    color: "#10B981",
  },
  {
    id: 5,
    name: "Olivia Johnson",
    role: "Solo Traveler",
    image: "https://picsum.photos/id/1047/100/100",
    content:
      "As a solo traveler, I was looking for meaningful connections and experiences. This journey delivered beyond my expectations with its artistic focus and small, intimate group settings.",
    location: "Bali, Indonesia",
    rating: 5,
    color: "#F59E0B",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const shapesRef = useRef(null);
  const slidesRef = useRef(null);

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

  // Auto-rotate testimonials
  useEffect(() => {
    setIsClient(true);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Pause rotation on hover
  const handleSlideHover = (isHovering) => {
    if (isHovering) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 6000);
    }
  };

  // Reset interval when active index changes manually
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex]);

  // GSAP animations
  useEffect(() => {
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

  // Generate stars based on rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-800"
      id="testimonials"
    >
      {/* Decorative background elements */}
      <div
        ref={shapesRef}
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      >
        <motion.div
          className="shape absolute top-40 -right-64 w-[30rem] h-[30rem] rounded-full bg-indigo-50 dark:bg-indigo-900/10 blur-3xl opacity-50"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
          }}
        ></motion.div>
        <motion.div
          className="shape absolute -bottom-80 -left-40 w-[40rem] h-[40rem] rounded-full bg-blue-50 dark:bg-blue-900/10 blur-3xl opacity-50"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${
              mousePosition.y * -20
            }px)`,
          }}
        ></motion.div>

        <svg
          className="shape absolute top-20 right-20 w-40 h-40 text-blue-500/5 dark:text-blue-400/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M44.3,-76.1C59.4,-69.7,74.8,-60.5,83.1,-47C91.3,-33.4,92.4,-16.7,90.6,-1.1C88.7,14.6,84,29.1,75,40.5C66,52,52.8,60.4,39.1,66C25.3,71.7,12.7,74.6,-0.7,75.8C-14,76.9,-28,76.4,-39.8,70.2C-51.5,64,-61,52.1,-68.6,39.1C-76.2,26.1,-81.8,13,-83.1,-0.7C-84.4,-14.5,-81.5,-29,-73.2,-39C-64.9,-49,-51.3,-54.6,-38.4,-62C-25.5,-69.4,-12.7,-78.7,1.5,-81.4C15.8,-84.1,31.5,-80.1,44.3,-76.1Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="shape absolute bottom-40 left-20 w-32 h-32 text-indigo-500/5 dark:text-indigo-400/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M42.7,-73.1C55.8,-67.3,67.2,-56.8,74.6,-43.7C82,-30.5,85.5,-15.3,83.5,-1.1C81.5,13,74.1,26,65.1,37.3C56.2,48.6,45.8,58.2,33.6,63.5C21.4,68.9,7.4,70.1,-5.6,67.8C-18.5,65.6,-30.5,59.9,-44.1,53.1C-57.7,46.3,-72.9,38.5,-79.9,26C-86.9,13.4,-85.7,-3.8,-81.2,-19.9C-76.8,-36,-69.1,-51,-57.2,-60.6C-45.3,-70.1,-29.2,-74.3,-14.2,-73.8C0.8,-73.3,15.8,-68.2,29.6,-68.4C43.5,-68.7,55.2,-74.3,42.7,-73.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          {/* Artistic section title */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20 backdrop-blur-sm mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mr-2"></div>
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Traveler Stories
            </span>
          </div>

          <h2 className="relative text-4xl sm:text-5xl font-bold mb-5 overflow-hidden inline-block">
            <span className="reveal-text block">Artistic</span>
            <span className="reveal-text block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500">
              Travel Experiences
            </span>
            <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
          </h2>

          <p className="reveal-text max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300 mb-10">
            Hear from travelers who have experienced our unique artistic
            approach to exploring the world's most inspiring destinations.
          </p>
        </div>

        <div
          ref={slidesRef}
          className="relative"
          onMouseEnter={() => handleSlideHover(true)}
          onMouseLeave={() => handleSlideHover(false)}
        >
          {/* Large quote icon */}
          <div className="absolute z-0 text-indigo-100 dark:text-indigo-900 opacity-30 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-40 w-40 md:h-60 md:w-60"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Testimonial cards */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  index === activeIndex && (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      className="relative py-10"
                    >
                      <div className="relative">
                        {/* Artistically styled card */}
                        <motion.div
                          className="relative z-10 p-8 md:p-10 bg-white dark:bg-slate-700 rounded-2xl shadow-xl overflow-hidden"
                          style={{
                            boxShadow: `0 20px 25px -5px ${testimonial.color}20, 0 10px 10px -5px ${testimonial.color}10`,
                          }}
                          whileHover={{
                            boxShadow: `0 25px 30px -5px ${testimonial.color}30, 0 10px 10px -5px ${testimonial.color}20`,
                          }}
                        >
                          {/* Decorative elements */}
                          <div
                            className="absolute top-0 right-0 w-24 h-24 -mt-10 -mr-10 rounded-full opacity-10"
                            style={{ backgroundColor: testimonial.color }}
                          ></div>
                          <div
                            className="absolute bottom-0 left-0 w-16 h-16 -mb-8 -ml-8 rounded-full opacity-10"
                            style={{ backgroundColor: testimonial.color }}
                          ></div>

                          {/* Location and rating */}
                          <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 dark:bg-slate-600">
                              <svg
                                className="w-4 h-4 mr-1 text-slate-500 dark:text-slate-300"
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
                              {testimonial.location}
                            </div>
                            <div className="flex">
                              {renderStars(testimonial.rating)}
                            </div>
                          </div>

                          {/* Testimonial text */}
                          <p className="text-xl md:text-2xl leading-relaxed text-slate-600 dark:text-slate-200 mb-8 italic relative">
                            <span className="absolute -top-2 -left-2 text-3xl text-slate-200 dark:text-slate-600">
                              "
                            </span>
                            {testimonial.content}
                            <span className="absolute -bottom-5 -right-2 text-3xl text-slate-200 dark:text-slate-600">
                              "
                            </span>
                          </p>

                          {/* Client info */}
                          <div className="flex items-center">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white dark:border-slate-600 shadow-md">
                              <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                              />
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                                {testimonial.name}
                              </h4>
                              <p
                                className="text-sm font-medium"
                                style={{ color: testimonial.color }}
                              >
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>

            {/* Indicator dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="group focus:outline-none"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-indigo-600 scale-125"
                        : "bg-slate-300 dark:bg-slate-600 scale-100 hover:bg-indigo-400"
                    }`}
                  ></div>
                </button>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center -mt-6 px-4 sm:px-0">
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )
                }
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === testimonials.length - 1 ? 0 : prev + 1
                  )
                }
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Artistic call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -left-6 -top-6 w-12 h-12 border-t-2 border-l-2 border-indigo-500/30 dark:border-indigo-400/30"
              animate={{
                rotate: [0, 5, 0, -5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              Ready to Begin Your Artistic Journey?
            </h3>
            <motion.div
              className="absolute -right-6 -bottom-6 w-12 h-12 border-b-2 border-r-2 border-indigo-500/30 dark:border-indigo-400/30"
              animate={{
                rotate: [0, 5, 0, -5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            ></motion.div>
          </div>

          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium shadow-lg"
          >
            <span className="relative z-10">Book Your Experience</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 z-0"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
