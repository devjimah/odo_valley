import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

// Gallery images with categories
const galleryImages = [
  {
    id: 1,
    src: "https://picsum.photos/id/1019/800/600",
    alt: "Tropical beach paradise",
    category: "beaches",
    color: "#0EA5E9",
    featured: true,
  },
  {
    id: 2,
    src: "https://picsum.photos/id/1018/800/600",
    alt: "Mountain view with lake",
    category: "mountains",
    color: "#8B5CF6",
    featured: false,
  },
  {
    id: 3,
    src: "https://picsum.photos/id/1036/800/600",
    alt: "Ancient temple in sunset",
    category: "historic",
    color: "#EC4899",
    featured: true,
  },
  {
    id: 4,
    src: "https://picsum.photos/id/160/800/600",
    alt: "Wildlife safari",
    category: "wildlife",
    color: "#F59E0B",
    featured: false,
  },
  {
    id: 5,
    src: "https://picsum.photos/id/171/800/600",
    alt: "Cultural market",
    category: "culture",
    color: "#10B981",
    featured: false,
  },
  {
    id: 6,
    src: "https://picsum.photos/id/237/800/600",
    alt: "Infinity pool with ocean view",
    category: "luxury",
    color: "#6366F1",
    featured: true,
  },
  {
    id: 7,
    src: "https://picsum.photos/id/110/800/600",
    alt: "Snow capped mountains",
    category: "mountains",
    color: "#8B5CF6",
    featured: false,
  },
  {
    id: 8,
    src: "https://picsum.photos/id/15/800/600",
    alt: "Waterfall in forest",
    category: "nature",
    color: "#059669",
    featured: false,
  },
  {
    id: 9,
    src: "https://picsum.photos/id/240/800/600",
    alt: "City skyline at night",
    category: "cities",
    color: "#3B82F6",
    featured: true,
  },
  {
    id: 10,
    src: "https://picsum.photos/id/25/800/600",
    alt: "Hot air balloons over landscape",
    category: "adventure",
    color: "#F59E0B",
    featured: false,
  },
  {
    id: 11,
    src: "https://picsum.photos/id/145/800/600",
    alt: "Historical streets of Italy",
    category: "historic",
    color: "#EC4899",
    featured: false,
  },
  {
    id: 12,
    src: "https://picsum.photos/id/135/800/600",
    alt: "Tropical island from above",
    category: "beaches",
    color: "#0EA5E9",
    featured: false,
  },
];

// Categories for filtering
const categories = [
  { id: "all", name: "All", color: "#3B82F6" },
  { id: "beaches", name: "Beaches", color: "#0EA5E9" },
  { id: "mountains", name: "Mountains", color: "#8B5CF6" },
  { id: "historic", name: "Historic", color: "#EC4899" },
  { id: "wildlife", name: "Wildlife", color: "#F59E0B" },
  { id: "culture", name: "Culture", color: "#10B981" },
  { id: "cities", name: "Cities", color: "#3B82F6" },
  { id: "adventure", name: "Adventure", color: "#F59E0B" },
  { id: "luxury", name: "Luxury", color: "#6366F1" },
  { id: "nature", name: "Nature", color: "#059669" },
];

const ArtisticImage = ({
  image,
  index,
  onClick,
  isActive,
  featured,
  delay,
}) => {
  const [hovered, setHovered] = useState(false);
  const imageRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const springConfig = { damping: 25, stiffness: 200 };
  const scaleSpring = useSpring(1, springConfig);
  const opacitySpring = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    scaleSpring.set(1.03);
    opacitySpring.set(1);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    scaleSpring.set(1);
    opacitySpring.set(0);
    x.set(0);
    y.set(0);
  };

  // Add GSAP floating animation
  useEffect(() => {
    if (imageRef.current) {
      const el = imageRef.current;
      gsap.to(el, {
        y: featured ? "8px" : "5px",
        duration: featured ? 3 : 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.15,
      });
    }
  }, [featured, index]);

  return (
    <motion.div
      ref={imageRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 100,
          delay: delay || index * 0.05,
        },
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{
        zIndex: 20,
        boxShadow: `0 20px 30px -10px ${image.color}40`,
      }}
      className={`group cursor-pointer relative overflow-hidden rounded-xl ${
        featured ? "md:col-span-2" : ""
      }`}
      style={{
        height: featured ? "380px" : "300px",
        transformStyle: "preserve-3d",
        transform: hovered
          ? `perspective(1000px) rotateX(${rotateX}) rotateY(${rotateY})`
          : "none",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(image)}
    >
      {/* Overlay gradient with motion */}
      <motion.div
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to top, ${image.color}cc, transparent)`,
          opacity: opacitySpring,
        }}
      />

      {/* Image with motion */}
      <motion.div
        className="relative w-full h-full"
        style={{ scale: scaleSpring }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMkUzQjRFIi8+PC9zdmc+"
        />
      </motion.div>

      {/* Fancy border effect */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent z-20 rounded-xl"
        animate={{
          borderColor: hovered ? `${image.color}90` : "transparent",
          background: hovered
            ? `linear-gradient(120deg, transparent, ${image.color}20, transparent)`
            : "none",
        }}
      />

      {/* Category badge */}
      <motion.div
        className="absolute top-4 right-4 z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -10 }}
        transition={{ duration: 0.2 }}
      >
        <span
          className="px-2.5 py-1 rounded-full text-xs uppercase tracking-wider text-white backdrop-blur-sm"
          style={{ backgroundColor: `${image.color}90` }}
        >
          {image.category}
        </span>
      </motion.div>

      {/* Image info */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 20,
          transition: { duration: 0.3, delay: 0.1 },
        }}
      >
        <h3 className="text-xl font-bold text-white mb-1">{image.alt}</h3>
        <div
          className="w-10 h-1 rounded-full"
          style={{ backgroundColor: "white" }}
        ></div>
      </motion.div>
    </motion.div>
  );
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverInfo, setHoverInfo] = useState({
    show: false,
    x: 0,
    y: 0,
    image: null,
  });
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const shapesRef = useRef(null);

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

  // Handle filter change
  useEffect(() => {
    setIsClient(true);

    if (activeCategory === "all") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(
        galleryImages.filter((img) => img.category === activeCategory)
      );
    }

    // Reset visible count when category changes
    setVisibleCount(6);
  }, [activeCategory]);

  // Update displayed images when filtered images or visible count changes
  useEffect(() => {
    setDisplayedImages(filteredImages.slice(0, visibleCount));
  }, [filteredImages, visibleCount]);

  // Load more images
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredImages.length));
  };

  // Register GSAP animations client-side only
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

  const handleImageHover = (show, image, event) => {
    if (show && event) {
      setHoverInfo({
        show,
        x: event.clientX,
        y: event.clientY,
        image,
      });
    } else {
      setHoverInfo({ ...hoverInfo, show: false });
    }
  };

  // Gradient text based on selected category
  const getGradientColors = () => {
    const category = categories.find((c) => c.id === activeCategory);
    if (category && category.id !== "all") {
      return `from-${
        category.id === "historic"
          ? "pink"
          : category.id === "mountains"
          ? "purple"
          : category.id === "beaches"
          ? "blue"
          : category.id === "nature"
          ? "green"
          : "blue"
      }-600 via-indigo-500 to-blue-500`;
    }
    return "from-blue-600 via-purple-500 to-teal-500";
  };

  // Enhanced image grid with masonry-like layout
  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-white dark:bg-slate-900"
      id="gallery"
    >
      {/* Decorative background elements */}
      <div
        ref={shapesRef}
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      >
        <motion.div
          className="shape absolute top-40 -right-64 w-[30rem] h-[30rem] rounded-full bg-blue-50 dark:bg-blue-900/10 blur-3xl opacity-50"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
          }}
        ></motion.div>
        <motion.div
          className="shape absolute -bottom-80 -left-40 w-[40rem] h-[40rem] rounded-full bg-purple-50 dark:bg-purple-900/10 blur-3xl opacity-50"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${
              mousePosition.y * -20
            }px)`,
          }}
        ></motion.div>

        <svg
          className="shape absolute top-20 left-20 w-40 h-40 text-teal-500/5 dark:text-teal-400/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M67.8,-22.3C74.9,5.9,59.8,38.5,33.7,57.1C7.6,75.7,-29.4,80.4,-50.6,64.5C-71.7,48.7,-77,12.3,-65.8,-17.2C-54.6,-46.7,-27.3,-69.3,3.2,-70.3C33.7,-71.3,60.7,-50.5,67.8,-22.3Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="shape absolute bottom-40 right-20 w-32 h-32 text-blue-500/5 dark:text-blue-400/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M45.3,-58.8C58.3,-48.7,68.5,-33.7,73.7,-16.9C78.9,-0.2,79.1,18.2,71.5,32.8C63.8,47.4,48.3,58.1,31.7,64.3C15.1,70.6,-2.7,72.4,-21.1,68.5C-39.5,64.7,-58.5,55.3,-67.2,39.9C-75.8,24.5,-74.1,3.2,-68.5,-15.8C-62.9,-34.7,-53.3,-51.3,-39.9,-60.9C-26.4,-70.6,-9.1,-73.3,7.2,-82.4C23.5,-91.4,32.3,-68.9,45.3,-58.8Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          {/* Artistic section title */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 backdrop-blur-sm mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-400 mr-2"></div>
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Visual Inspirations
            </span>
          </div>

          <h2 className="relative text-4xl sm:text-5xl font-bold mb-5 overflow-hidden inline-block">
            <span className="reveal-text block">Artistic</span>
            <span
              className={`reveal-text block text-transparent bg-clip-text bg-gradient-to-r ${getGradientColors()}`}
            >
              Travel Gallery
            </span>
            <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
          </h2>

          <p className="reveal-text max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300 mb-10">
            Immerse yourself in stunning visuals from our most popular
            destinations and get inspired for your next artistic journey.
          </p>

          {/* Enhanced category filters with artistic styling */}
          <LayoutGroup>
            <div className="flex flex-wrap justify-center gap-3 mb-16 relative">
              {categories.map((category, index) => {
                const isActive = activeCategory === category.id;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all overflow-hidden ${
                      isActive
                        ? "text-white shadow-lg"
                        : "bg-white/30 dark:bg-white/5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                    style={{
                      boxShadow: isActive
                        ? `0 10px 15px -3px ${category.color}40`
                        : "none",
                    }}
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 -z-10"
                        layoutId="activeCategory"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        style={{
                          background: `linear-gradient(135deg, ${category.color}, ${category.color}aa)`,
                        }}
                      />
                    )}
                    {category.name}
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Enhanced gallery grid with masonry layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedImages.map((image, index) => (
              <ArtisticImage
                key={image.id}
                image={image}
                index={index}
                onClick={setSelectedImage}
                featured={image.featured}
                delay={index * 0.05}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More button with enhanced animation */}
        {displayedImages.length < filteredImages.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={handleLoadMore}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 25px -5px rgba(124, 58, 237, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 py-3 rounded-xl overflow-hidden text-white font-medium shadow-lg"
            >
              <span className="relative z-10 flex items-center">
                <span>Load More</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-indigo-600"
                animate={{
                  background: [
                    "linear-gradient(to right, #8b5cf6, #6366f1)",
                    "linear-gradient(to right, #6366f1, #8b5cf6)",
                    "linear-gradient(to right, #8b5cf6, #6366f1)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.button>
          </motion.div>
        )}

        {/* Enhanced modal for enlarged image */}
        <AnimatePresence>
          {isClient && selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-xl"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Add decorative corners */}
                <div
                  className="absolute -top-px -left-px w-12 h-12 rounded-tl-xl rounded-br-none opacity-70"
                  style={{
                    background: `linear-gradient(135deg, ${selectedImage.color}, transparent)`,
                  }}
                ></div>
                <div
                  className="absolute -bottom-px -right-px w-12 h-12 rounded-br-xl rounded-tl-none opacity-70"
                  style={{
                    background: `linear-gradient(315deg, ${selectedImage.color}, transparent)`,
                  }}
                ></div>

                <div className="relative w-full max-h-[80vh]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1200}
                    height={800}
                    objectFit="contain"
                    className="rounded-xl"
                  />
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedImage.alt}
                  </h3>
                  <p className="text-white/70 mb-2">
                    Category:{" "}
                    <span
                      className="text-white font-medium capitalize px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${selectedImage.color}50` }}
                    >
                      {selectedImage.category}
                    </span>
                  </p>
                </motion.div>

                {/* Artistic close button */}
                <motion.button
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 backdrop-blur-sm border border-white/10"
                  onClick={() => setSelectedImage(null)}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: selectedImage.color,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced "Explore Full Gallery" button */}
        {filteredImages.length > 0 && (
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
                boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.25)",
              }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden px-8 py-4 rounded-xl text-white font-medium shadow-lg"
            >
              <span className="relative z-10">Explore Full Gallery</span>
              <motion.div
                className="absolute inset-0 -z-10"
                initial={{
                  background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
                }}
                whileHover={{
                  background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            {/* Artistic decorative line */}
            <div className="w-20 h-1 mx-auto mt-10 rounded-full bg-gradient-to-r from-purple-500/50 via-transparent to-blue-500/50"></div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
