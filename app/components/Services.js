import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import apiService from "../services/apiService";

// Fallback destinations if API fails
const fallbackDestinations = [
  {
    id: 1,
    title: "Serene Beaches",
    description:
      "Explore pristine beaches with crystal clear waters, perfect for relaxation and water activities.",
    image: "https://picsum.photos/id/1019/800/600",
    rating: 4.9,
    price: "From $799",
    color: "#06B6D4",
    tags: ["Relaxation", "Ocean", "Sunshine"],
  },
  {
    id: 2,
    title: "Mountain Retreats",
    description:
      "Discover breathtaking mountain landscapes, hiking trails and cozy cabins for an unforgettable retreat.",
    image: "https://picsum.photos/id/1018/800/600",
    rating: 4.8,
    price: "From $899",
    color: "#8B5CF6",
    tags: ["Adventure", "Nature", "Hiking"],
  },
  {
    id: 3,
    title: "Historic Cities",
    description:
      "Immerse yourself in culture and history as you wander through charming streets of ancient cities.",
    image: "https://picsum.photos/id/1029/800/600",
    rating: 4.7,
    price: "From $749",
    color: "#EC4899",
    tags: ["Culture", "Architecture", "History"],
  },
  {
    id: 4,
    title: "Tropical Islands",
    description:
      "Experience paradise on earth with our exclusive island getaways, featuring luxury resorts and adventures.",
    image: "https://picsum.photos/id/1039/800/600",
    rating: 4.9,
    price: "From $1299",
    color: "#10B981",
    tags: ["Luxury", "Paradise", "Beaches"],
  },
  {
    id: 5,
    title: "Wildlife Safaris",
    description:
      "Encounter magnificent wildlife in their natural habitats with our guided safari experiences.",
    image: "https://picsum.photos/id/219/800/600",
    rating: 4.8,
    price: "From $1499",
    color: "#F59E0B",
    tags: ["Wildlife", "Adventure", "Nature"],
  },
  {
    id: 6,
    title: "Cultural Journeys",
    description:
      "Dive deep into local traditions, cuisines, and festivities that make each destination unique.",
    image: "https://picsum.photos/id/177/800/600",
    rating: 4.7,
    price: "From $699",
    color: "#3B82F6",
    tags: ["Culture", "Food", "Traditions"],
  },
];

const DestinationCard = ({ destination, index, active, setActive }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const isActive = active === destination._id || active === destination.id;

  // Format image URL correctly
  const imageUrl = destination.image?.startsWith("/uploads")
    ? `http://localhost:5000${destination.image}`
    : destination.image;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() =>
        setActive(isActive ? null : destination._id || destination.id)
      }
    >
      <motion.div
        className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 ${
          isActive ? "ring-2 ring-offset-4 dark:ring-offset-slate-900" : ""
        }`}
        style={{
          boxShadow: `0 10px 30px -15px ${destination.color}40`,
          ringColor: destination.color,
        }}
        animate={{
          y: hovered ? -8 : 0,
          scale: isActive ? 1.02 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <div className="relative h-56 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/70 z-10 opacity-60" />

          <motion.div
            animate={{
              scale: hovered || isActive ? 1.08 : 1,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="h-full w-full"
          >
            <Image
              src={imageUrl}
              alt={destination.title}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjA3OEJEIi8+PC9zdmc+"
              onError={(e) => {
                // Fallback for image load errors
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/id/1019/800/600";
              }}
            />
          </motion.div>

          <div className="absolute top-4 right-4 z-20">
            <div
              className="flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{
                background: `${destination.color}22`,
                color: destination.color,
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
              {destination.rating}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="flex gap-2 mb-1.5">
              {destination.tags &&
                destination.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="inline-block text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5 text-white bg-white/20 backdrop-filter backdrop-blur-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
            </div>
            <h3 className="text-xl font-bold text-white">
              {destination.title}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div className="max-w-[80%]">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {destination.description}
              </p>
            </div>
            <span
              className="text-lg font-semibold"
              style={{ color: destination.color }}
            >
              {destination.price}
            </span>
          </div>

          <motion.div
            className="mt-6 overflow-hidden"
            animate={{ height: isActive ? "auto" : "40px" }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3">
              <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                Highlights
              </h4>
              <ul className="space-y-2">
                {destination.highlights && destination.highlights.length > 0
                  ? destination.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? 0 : -10,
                        }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center text-sm"
                      >
                        <motion.div
                          className="w-4 h-4 mr-2 rounded-full flex-shrink-0 flex items-center justify-center"
                          style={{ background: destination.color }}
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
                        <span>{highlight}</span>
                      </motion.li>
                    ))
                  : // Fallback if no highlights are provided
                    [...Array(3)].map((_, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? 0 : -10,
                        }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center text-sm"
                      >
                        <motion.div
                          className="w-4 h-4 mr-2 rounded-full flex-shrink-0 flex items-center justify-center"
                          style={{ background: destination.color }}
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
                        <span>Destination highlight {i + 1}</span>
                      </motion.li>
                    ))}
              </ul>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 w-full py-2.5 rounded-xl text-white text-sm font-medium"
                style={{ backgroundColor: destination.color }}
              >
                Explore This Destination
              </motion.button>
            </div>
          </motion.div>
        </div>

        {!isActive && (
          <motion.div
            className="absolute bottom-4 right-4 z-10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-700"
              onClick={(e) => {
                e.stopPropagation();
                setActive(destination._id || destination.id);
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Destinations = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const shapesRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [activeDestination, setActiveDestination] = useState(null);
  const [filterTag, setFilterTag] = useState("all");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredDestinations =
    filterTag === "all"
      ? destinations
      : destinations.filter((d) =>
          d.tags.some((tag) => tag.toLowerCase() === filterTag.toLowerCase())
        );

  const allTags = [
    "all",
    ...new Set(
      destinations.flatMap((d) => d.tags.map((tag) => tag.toLowerCase()))
    ),
  ];

  // Fetch destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await apiService.getDestinations({ featured: true });
        setDestinations(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setError("Failed to load destinations");
        // Use fallback data
        setDestinations(fallbackDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const gsapModule = import("gsap").then(({ default: gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);

          // Animate in the section title
          gsap.fromTo(
            headingRef.current.querySelectorAll(".reveal-text"),
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
                trigger: headingRef.current,
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

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900"
      id="services"
    >
      {/* Decorative background elements */}
      <div
        ref={shapesRef}
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      >
        <div className="shape absolute top-40 -right-64 w-[30rem] h-[30rem] rounded-full bg-blue-50 dark:bg-blue-900/20 blur-3xl opacity-70"></div>
        <div className="shape absolute -bottom-80 -left-40 w-[40rem] h-[40rem] rounded-full bg-teal-50 dark:bg-teal-900/20 blur-3xl opacity-70"></div>

        <svg
          className="shape absolute top-10 left-10 w-40 h-40 text-blue-500/5 dark:text-blue-400/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M39.9,-65.7C51.5,-58.4,60.8,-47.9,67.1,-35.8C73.4,-23.7,76.8,-9.9,76.5,4.3C76.2,18.5,72.1,33.1,63.8,44.3C55.5,55.5,43,63.4,29.5,68C16,72.7,1.4,74.2,-11.4,70.8C-24.2,67.4,-35.1,59.1,-43.5,49.1C-51.9,39.1,-57.8,27.4,-62.8,14.6C-67.8,1.9,-72,-11.7,-68.5,-23.5C-64.9,-35.3,-53.7,-45.1,-41.4,-52.2C-29.1,-59.3,-15.6,-63.5,-0.9,-62.1C13.8,-60.6,28.3,-53.1,39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="shape absolute bottom-10 right-10 w-32 h-32 text-purple-500/5 dark:text-purple-400/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M47.5,-73.3C62.4,-67.3,76.1,-56.3,79.4,-42.7C82.8,-29,75.9,-12.9,71.7,2.4C67.5,17.8,66,32.3,59,43.9C52.1,55.5,39.7,64.1,26.2,69.9C12.8,75.7,-1.6,78.7,-15.9,76.5C-30.2,74.3,-44.4,67,-56.4,56.4C-68.4,45.8,-78.3,31.9,-81.8,16.3C-85.3,0.7,-82.5,-16.7,-74.3,-30.4C-66.1,-44,-52.6,-54,-39.1,-60.1C-25.6,-66.2,-12.8,-68.3,1.3,-70.5C15.5,-72.6,31,-79.4,47.5,-73.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          {/* Artistic section title */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></div>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Curated Destinations
            </span>
          </div>

          <h2 className="relative text-4xl sm:text-5xl font-bold mb-5 overflow-hidden inline-block">
            <span className="reveal-text block">Discover Our</span>
            <span className="reveal-text block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400">
              Artistic Destinations
            </span>
            <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
          </h2>

          <p className="reveal-text max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300 mb-10">
            Immerse yourself in breathtaking landscapes and cultural wonders
            carefully selected to inspire your artistic journey and create
            lasting memories.
          </p>

          {/* Tag filters with artistic styling */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {allTags.map((tag, index) => (
              <motion.button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border backdrop-blur-sm transition-all ${
                  filterTag === tag
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-transparent text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/30 dark:bg-white/5 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + index * 0.05,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error && destinations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filterTag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredDestinations.map((destination, index) => (
                <DestinationCard
                  key={destination._id || destination.id}
                  destination={destination}
                  index={index}
                  active={activeDestination}
                  setActive={setActiveDestination}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg"
          >
            <span className="relative z-10">Explore All Destinations</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 z-0"
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

export default Destinations;
