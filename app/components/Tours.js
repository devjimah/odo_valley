import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const tours = [
  {
    id: 1,
    title: "Mediterranean Cruise",
    description:
      "Explore the stunning coastlines of Italy, Greece, and Croatia on this 10-day luxury cruise.",
    image: "https://picsum.photos/id/164/800/600",
    days: 10,
    price: 2499,
    rating: 4.9,
    color: "#0EA5E9",
    features: [
      "Luxury accommodation",
      "All meals included",
      "Guided tours",
      "Evening entertainment",
    ],
    locations: ["Italy", "Greece", "Croatia"],
  },
  {
    id: 2,
    title: "Southeast Asia Explorer",
    description:
      "Experience the magic of Thailand, Vietnam, and Cambodia with this immersive cultural journey.",
    image: "https://picsum.photos/id/167/800/600",
    days: 14,
    price: 1899,
    rating: 4.7,
    color: "#F97316",
    features: [
      "Local guides",
      "Authentic experiences",
      "3-star hotels",
      "Some meals included",
    ],
    locations: ["Thailand", "Vietnam", "Cambodia"],
  },
  {
    id: 3,
    title: "African Safari Adventure",
    description:
      "Witness the majestic wildlife of Kenya and Tanzania on this unforgettable safari expedition.",
    image: "https://picsum.photos/id/158/800/600",
    days: 7,
    price: 3299,
    rating: 4.8,
    color: "#16A34A",
    features: [
      "Luxury lodges",
      "Expert wildlife guides",
      "All-inclusive",
      "Small groups",
    ],
    locations: ["Kenya", "Tanzania"],
  },
];

const TourCard = ({ tour, index, expanded, setExpanded }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = expanded === tour.id;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`bg-white dark:bg-slate-800 rounded-2xl h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ${
          isExpanded ? "ring-2 ring-offset-4 dark:ring-offset-slate-900" : ""
        }`}
        animate={{
          scale: isExpanded ? 1.02 : 1,
          borderColor: isExpanded ? tour.color : "transparent",
          boxShadow: isHovered
            ? `0 20px 25px -5px ${tour.color}30`
            : `0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
        }}
        style={{
          borderColor: isExpanded ? tour.color : "transparent",
          borderWidth: "2px",
          ringColor: tour.color,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-64 w-full overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7 }}
            className="h-full w-full"
          >
            <Image
              src={tour.image}
              alt={tour.title}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMkUzQjRFIi8+PC9zdmc+"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
          </motion.div>

          {/* Artistic decorative elements */}
          <div
            className="absolute top-0 left-0 w-full h-1.5"
            style={{
              background: `linear-gradient(to right, transparent, ${tour.color}, transparent)`,
            }}
          ></div>

          <div className="absolute top-4 left-4 flex items-center gap-2">
            {tour.locations.map((location, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="inline-block text-xs uppercase tracking-wider rounded-full px-2 py-0.5 text-white bg-white/20 backdrop-filter backdrop-blur-sm"
              >
                {location}
              </motion.span>
            ))}
          </div>

          <div className="absolute top-4 right-4 z-10">
            <div
              className="flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{
                background: `${tour.color}22`,
                color: tour.color,
                backdropFilter: "blur(8px)",
              }}
            >
              <svg
                className="w-3.5 h-3.5 mr-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {tour.rating}
            </div>
          </div>

          <div className="absolute left-4 right-4 bottom-4 flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-bold text-white">{tour.title}</h3>
              <div className="flex items-center mt-1">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center mr-2"
                  style={{ backgroundColor: tour.color }}
                >
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-white/90 text-sm">{tour.days} Days</span>
              </div>
            </div>
            <div className="text-white text-2xl font-bold">
              ${tour.price}
              <span className="text-white/70 text-xs ml-1">per person</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            {tour.description}
          </p>

          <motion.div
            className="mt-4 space-y-5"
            animate={{ opacity: isExpanded ? 1 : 0.7 }}
          >
            <div>
              <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-medium">
                Tour Highlights
              </h4>
              <ul className="grid grid-cols-2 gap-x-2 gap-y-2">
                {tour.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isExpanded ? 1 : 0.5,
                      x: isExpanded ? 0 : -5,
                    }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <motion.div
                      className="w-4 h-4 mr-2 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: tour.color }}
                    >
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <motion.button
                onClick={() => setExpanded(isExpanded ? null : tour.id)}
                whileHover={{ scale: 1.05, x: isExpanded ? 0 : 3 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium flex items-center"
                style={{ color: tour.color }}
              >
                {isExpanded ? "Show Less" : "View Details"}
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 10px 15px -3px ${tour.color}40`,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-xl text-white text-sm font-medium"
                    style={{ backgroundColor: tour.color }}
                  >
                    Book Now
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Artistic decorative corner */}
        <div
          className="absolute -top-px -right-px w-8 h-8 rounded-bl-xl rounded-tr-xl opacity-70"
          style={{ background: tour.color }}
        ></div>
      </motion.div>
    </motion.div>
  );
};

const Tours = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [expandedTour, setExpandedTour] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const gsapModule = import("gsap").then(({ default: gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);

          // Artistic text reveal animation
          gsap.fromTo(
            titleRef.current.querySelectorAll(".split-text"),
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
      className="py-24 relative overflow-hidden bg-slate-100 dark:bg-slate-800"
      id="tours"
    >
      {/* Artistic background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating circles with parallax effect */}
        <div
          className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-teal-50 dark:bg-teal-900/10 blur-3xl opacity-60 mix-blend-multiply"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${
              mousePosition.y * -30
            }px)`,
          }}
        ></div>
        <div
          className="absolute bottom-60 -right-40 w-[40rem] h-[40rem] rounded-full bg-blue-50 dark:bg-blue-900/10 blur-3xl opacity-60 mix-blend-multiply"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${
              mousePosition.y * 30
            }px)`,
          }}
        ></div>

        {/* Animated patterns */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle
                id="pattern-circle"
                cx="10"
                cy="10"
                r="1"
                fill="currentColor"
              ></circle>
            </pattern>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            ></rect>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          {/* Artistic section title */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 backdrop-blur-sm mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mr-2"></div>
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Unforgettable Journeys
            </span>
          </div>

          <div className="overflow-hidden mb-1">
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="split-text block">Featured</span>
              <span className="split-text block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500">
                Artistic Tours
              </span>
            </h2>
          </div>

          <div className="w-20 h-1.5 mx-auto mt-4 mb-6 rounded-full bg-gradient-to-r from-indigo-500/50 to-purple-500/50"></div>

          <p className="split-text max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300 mb-4">
            Discover our carefully crafted tour packages designed to provide
            unforgettable experiences through an artistic lens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <TourCard
              key={tour.id}
              tour={tour}
              index={index}
              expanded={expandedTour}
              setExpanded={setExpandedTour}
            />
          ))}
        </div>

        <div className="mt-20 text-center">
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium shadow-lg"
          >
            <span className="relative z-10">Explore All Artistic Tours</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 z-0"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>

          {/* Artistic decorative corner */}
          <motion.div
            className="w-48 h-1 mx-auto mt-12 relative"
            animate={{
              background: [
                "linear-gradient(to right, #4f46e5, #3b82f6)",
                "linear-gradient(to right, #3b82f6, #4f46e5)",
                "linear-gradient(to right, #4f46e5, #3b82f6)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-blue-500"
              animate={{
                x: [0, 100, 0],
                backgroundColor: ["#4f46e5", "#3b82f6", "#4f46e5"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Tours;
