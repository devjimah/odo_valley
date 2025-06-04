import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const carouselImages = [
  {
    id: 1,
    src: "https://picsum.photos/id/1036/1200/900",
    alt: "Beautiful mountain landscape",
    color: "#3B82F6",
  },
  {
    id: 2,
    src: "https://picsum.photos/id/164/1200/900",
    alt: "Tranquil beach sunset",
    color: "#06B6D4",
  },
  {
    id: 3,
    src: "https://picsum.photos/id/29/1200/900",
    alt: "Historic European architecture",
    color: "#8B5CF6",
  },
  {
    id: 4,
    src: "https://picsum.photos/id/137/1200/900",
    alt: "Tropical island paradise",
    color: "#10B981",
  },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const shapeRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isClient, setIsClient] = useState(false);
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

  // Auto-rotate carousel
  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate decorative elements
    tl.fromTo(
      shapeRef.current.querySelectorAll(".shape"),
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      }
    )
      .fromTo(
        titleRef.current.querySelectorAll(".char"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.8,
        },
        "-=0.5"
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, []);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  // Split text into characters for animation
  const splitTextIntoChars = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-900 py-16 md:py-0"
    >
      {/* Artistic Background Elements */}
      <div
        ref={shapeRef}
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      >
        <div
          className="shape absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${
              mousePosition.y * -20
            }px)`,
          }}
        ></div>
        <div
          className="shape absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-gradient-to-l from-teal-500/10 to-blue-500/10 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
          }}
        ></div>
        <svg
          className="shape absolute -top-24 -left-24 w-64 h-64 text-blue-500/5 dark:text-blue-400/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,89.9,-16.3,88.6,-0.8C87.3,14.7,82.3,29.3,74.1,42.6C65.9,55.9,54.5,67.8,41,74.3C27.5,80.7,13.8,81.7,-0.9,83.1C-15.5,84.5,-31.1,86.4,-43.8,80.5C-56.5,74.6,-66.3,61,-73.6,46.2C-80.9,31.4,-85.8,15.7,-86.4,-0.3C-87,-16.3,-83.3,-32.5,-75.6,-46.9C-67.9,-61.3,-56.3,-73.8,-42.4,-81C-28.6,-88.1,-14.3,-89.9,0.8,-91.3C15.8,-92.6,31.7,-93.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="shape absolute -bottom-32 -right-32 w-96 h-96 text-teal-500/5 dark:text-teal-400/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M42.7,-73.4C56.1,-67.3,68.2,-57,77.3,-43.5C86.3,-30,92.4,-15,92.1,-0.2C91.8,14.7,85.2,29.3,76.1,42.3C67,55.2,55.4,66.5,41.6,73.5C27.8,80.6,13.9,83.4,-0.2,83.7C-14.3,84,-28.5,81.9,-41,75.1C-53.5,68.4,-64.2,57.1,-71.7,43.9C-79.3,30.7,-83.6,15.3,-84.1,0C-84.5,-15.4,-81.1,-30.8,-73.4,-44.2C-65.7,-57.5,-53.8,-68.8,-40.1,-74.7C-26.4,-80.7,-13.2,-81.4,1,-83C15.2,-84.6,30.3,-88.1,42.7,-73.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-4 h-full items-center">
          {/* Left column - Text content (spans 3 columns) */}
          <div className="md:col-span-3 py-10 md:py-20 relative">
            {/* Artistic badge */}
            <div className="mb-8 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 0.8 }}
                className="h-10 bg-blue-500/10 dark:bg-blue-400/20 backdrop-blur-sm rounded-r-full inline-flex items-center overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-3"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  className="pr-6 text-blue-700 dark:text-blue-300 font-medium"
                >
                  Curated Artful Experiences
                </motion.span>
              </motion.div>
            </div>

            {/* Creative headline with stylized text */}
            <div className="relative mb-6 overflow-hidden">
              <h1
                ref={titleRef}
                className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
              >
                <div className="mb-2">{splitTextIntoChars("Discover")}</div>
                <div className="flex items-center">
                  <span className="mr-4">{splitTextIntoChars("The")}</span>
                  <div className="h-[2px] w-16 bg-gradient-to-r from-blue-600 to-transparent"></div>
                </div>
                <div className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-teal-500 dark:from-blue-400 dark:via-purple-400 dark:to-teal-400">
                    {splitTextIntoChars("World With Us")}
                  </span>
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: 0 }}
                    transition={{
                      delay: 1.2,
                      duration: 1.2,
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 right-0 h-full bg-slate-50 dark:bg-slate-900"
                  />
                </div>
              </h1>
            </div>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-xl leading-relaxed"
            >
              Explore breathtaking destinations curated through an artistic
              lens, where each journey becomes a masterpiece of unforgettable
              moments and cultural immersion.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl group"
              >
                <span className="relative z-10">Explore Journeys</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(255,255,255,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative px-8 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 font-medium hover:bg-white/5 dark:hover:bg-white/5 backdrop-blur-sm overflow-hidden group"
              >
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white">
                  Artistic Destinations
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/10 dark:bg-white/5 z-0"
                  initial={{ y: "-100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </div>

            {/* Creative stats presentation */}
            <div className="mt-16 grid grid-cols-3 gap-6 relative">
              {[
                { value: "50+", label: "Destinations", icon: "🌏" },
                { value: "10+", label: "Years", icon: "⏳" },
                { value: "12k+", label: "Travelers", icon: "👨‍👩‍👧‍👦" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.2 }}
                  className="relative"
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-lg z-10">
                    {stat.icon}
                  </div>
                  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-slate-700/50">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column - Image carousel (spans 2 columns) */}
          <div className="md:col-span-2 relative h-[400px] md:h-[600px] w-full">
            {/* Artistic frame */}
            <div className="absolute top-0 left-0 w-full h-full rounded-2xl p-3 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-transparent backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.1, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full h-full rounded-xl overflow-hidden"
                >
                  <Image
                    src={carouselImages[currentImage].src}
                    alt={carouselImages[currentImage].alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMkUzQjRFIi8+PC9zdmc+"
                  />

                  {/* Artistic overlay */}
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-30"
                    style={{
                      backgroundColor: carouselImages[currentImage].color,
                    }}
                  ></div>

                  {/* Caption overlay with artistic design */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-20 pb-6 px-6">
                    <div className="flex items-center">
                      <div className="w-12 h-[2px] bg-white opacity-50 mr-4"></div>
                      <motion.h3
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-white"
                      >
                        {carouselImages[currentImage].alt}
                      </motion.h3>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Artistic navigation dots */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className="group flex items-center"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <motion.div
                      animate={{
                        width: currentImage === index ? "1.5rem" : "0.5rem",
                        opacity: currentImage === index ? 1 : 0.5,
                      }}
                      className="h-2 bg-white rounded-full"
                      style={{
                        backgroundColor:
                          currentImage === index
                            ? carouselImages[index].color
                            : "white",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full border-4 border-blue-500/20 dark:border-blue-400/20"
              animate={{
                rotate: 360,
                borderColor: [
                  "rgba(59,130,246,0.2)",
                  "rgba(139,92,246,0.2)",
                  "rgba(59,130,246,0.2)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute -left-8 -top-8 w-16 h-16 rounded-full border-4 border-teal-500/20 dark:border-teal-400/20"
              animate={{
                rotate: -360,
                borderColor: [
                  "rgba(20,184,166,0.2)",
                  "rgba(59,130,246,0.2)",
                  "rgba(20,184,166,0.2)",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Navigation arrows with artistic style */}
            <button
              onClick={() =>
                setCurrentImage((current) =>
                  current === 0 ? carouselImages.length - 1 : current - 1
                )
              }
              className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all group"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform"
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
            </button>

            <button
              onClick={() =>
                setCurrentImage((current) =>
                  current === carouselImages.length - 1 ? 0 : current + 1
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all group"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 group-hover:translate-x-0.5 transition-transform"
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
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
