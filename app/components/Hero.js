import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import apiService from "../services/apiService";

// Highlife music playlist for the nature experience
const musicPlaylist = [
  {
    id: 1,
    title: "Tahama",
    artist: "Don Ziggy",
    src: "/assets/audio/DonZiggy-Tahama.mp3",
    duration: "3:45",
  },
  {
    id: 2,
    title: "Eye Open",
    artist: "Black Sherif",
    src: "/assets/audio/Black-Sherif-Eye-Open-Halmblog.com_.mp3",
    duration: "3:30",
  },
];

// Weather states for dynamic atmosphere
const weatherStates = [
  {
    id: "sunny",
    emoji: "☀️",
    filter: "brightness(1.1)",
    overlay: "bg-yellow-500/5",
  },
  {
    id: "cloudy",
    emoji: "☁️",
    filter: "brightness(0.9)",
    overlay: "bg-gray-500/10",
  },
  {
    id: "misty",
    emoji: "🌫️",
    filter: "blur(0.5px) brightness(0.8)",
    overlay: "bg-blue-500/10",
  },
  {
    id: "golden",
    emoji: "🌅",
    filter: "sepia(0.2) brightness(1.1)",
    overlay: "bg-orange-500/10",
  },
];

// Default fallback cards (used if API fails)
const defaultCarouselCards = [
  {
    id: 1,
    icon: "🌱",
    title: "Biodiversity",
    description:
      "Discover 300+ native species thriving in our protected ecosystem. Experience the rich tapestry of life that calls Odo Valley home.",
    stat: "300+",
    statLabel: "Species",
    color: "from-green-400 to-emerald-500",
    image: "/assets/images/photo_1_2025-06-23_04-00-34.jpg",
  },
  {
    id: 2,
    icon: "🍃",
    title: "Organic Farming",
    description:
      "100% sustainable practices with zero chemical interventions. Learn traditional farming methods passed down through generations.",
    stat: "100%",
    statLabel: "Organic",
    color: "from-emerald-400 to-teal-500",
    image: "/assets/images/photo_4_2025-06-23_04-00-34.jpg",
  },
  {
    id: 3,
    icon: "🦋",
    title: "Eco Tourism",
    description:
      "Immersive farm experiences that connect you with nature. Guided tours through our sustainable agricultural paradise.",
    stat: "50+",
    statLabel: "Activities",
    color: "from-teal-400 to-cyan-500",
    image: "/assets/images/photo_7_2025-06-23_04-00-34.jpg",
  },
  {
    id: 4,
    icon: "🌾",
    title: "Harvest Tours",
    description:
      "Join our seasonal harvest and learn traditional farming methods. Experience the joy of working with the land.",
    stat: "4",
    statLabel: "Seasons",
    color: "from-yellow-400 to-orange-500",
    image: "/assets/images/photo_13_2025-06-23_04-00-34.jpg",
  },
  {
    id: 5,
    icon: "🏡",
    title: "Farm Stay",
    description:
      "Overnight experiences in our eco-friendly accommodations. Wake up to the sounds of nature every morning.",
    stat: "24/7",
    statLabel: "Access",
    color: "from-orange-400 to-red-500",
    image: "/assets/images/photo_15_2025-06-23_04-00-34.jpg",
  },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [carouselCards, setCarouselCards] = useState(defaultCarouselCards);
  const [loadingCards, setLoadingCards] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(weatherStates[0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [timeOfDay, setTimeOfDay] = useState("day");

  // Scroll-based animations
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mount effect to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
    fetchHeroCards();

    // Set time of day based on current hour
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 6 && hour < 18 ? "day" : "night");

    // Random weather change every 30 seconds
    const weatherInterval = setInterval(() => {
      setCurrentWeather(
        weatherStates[Math.floor(Math.random() * weatherStates.length)]
      );
    }, 30000);

    return () => clearInterval(weatherInterval);
  }, []);

  // Mouse movement tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fetch hero cards from API
  const fetchHeroCards = async () => {
    try {
      const heroCards = await apiService.getHeroCards();
      if (heroCards && heroCards.length > 0) {
        const transformedCards = heroCards.map((card) => ({
          id: card._id,
          icon: card.icon,
          title: card.title,
          description: card.description,
          stat: card.stat,
          statLabel: card.statLabel,
          color: card.color,
          image: card.image,
        }));
        setCarouselCards(transformedCards);
      }
    } catch (error) {
      console.log("Failed to fetch hero cards, using defaults:", error);
    } finally {
      setLoadingCards(false);
    }
  };

  // Audio setup and autoplay logic
  useEffect(() => {
    if (!isMounted) return;

    const tryPlayAudio = async () => {
      if (!audioRef.current) return;

      try {
        audioRef.current.volume = 0.25;
        audioRef.current.muted = false;

        const playAttempts = [0, 100, 500, 1000, 2000];

        for (const delay of playAttempts) {
          await new Promise((resolve) => setTimeout(resolve, delay));

          try {
            await audioRef.current.play();
            setAudioEnabled(true);
            console.log(`Audio started successfully after ${delay}ms`);
            return;
          } catch (error) {
            console.log(`Audio attempt ${delay}ms failed:`, error.message);
          }
        }

        console.log(
          "All autoplay attempts failed, waiting for user interaction"
        );
        setupUserInteractionListeners();
      } catch (error) {
        console.log("Audio setup error:", error);
        setupUserInteractionListeners();
      }
    };

    const setupUserInteractionListeners = () => {
      const enableAudio = async () => {
        if (audioRef.current) {
          try {
            audioRef.current.volume = 0.25;
            await audioRef.current.play();
            setAudioEnabled(true);
            console.log("Audio enabled via user interaction");

            document.removeEventListener("click", enableAudio);
            document.removeEventListener("touchstart", enableAudio);
            document.removeEventListener("keydown", enableAudio);
            document.removeEventListener("mousemove", enableAudio);
          } catch (error) {
            console.log("User interaction audio failed:", error);
          }
        }
      };

      document.addEventListener("click", enableAudio, { once: true });
      document.addEventListener("touchstart", enableAudio, { once: true });
      document.addEventListener("keydown", enableAudio, { once: true });

      setTimeout(() => {
        if (!audioEnabled) {
          document.addEventListener("mousemove", enableAudio, { once: true });
        }
      }, 3000);
    };

    const timer = setTimeout(() => {
      setIsLoaded(true);
      tryPlayAudio();
    }, 800);

    return () => clearTimeout(timer);
  }, [audioEnabled, isMounted]);

  // Auto-play next track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setCurrentTrackIndex((prev) =>
        prev === musicPlaylist.length - 1 ? 0 : prev + 1
      );
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentTrackIndex]);

  // Auto-cycle carousel cards
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % carouselCards.length);
    }, 4000); // Slower transition for better viewing

    return () => clearInterval(interval);
  }, [isMounted, carouselCards.length]);

  const getVisibleCards = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index =
        (currentCardIndex + i + carouselCards.length) % carouselCards.length;
      visible.push({
        ...carouselCards[index],
        position: i,
        isFocused: i === 0,
      });
    }
    return visible;
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ y: y1, opacity }}
      className="relative min-h-screen w-full flex items-center justify-center px-4 lg:px-8 overflow-hidden"
    >
      {/* Auto-playing background music */}
      <audio
        ref={audioRef}
        src={musicPlaylist[currentTrackIndex].src}
        autoPlay
        loop={false}
        preload="auto"
        className="hidden"
      />

      {/* Dynamic Weather Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-[3s] ${currentWeather.overlay}`}
        style={{ filter: currentWeather.filter }}
      />

      {/* Morphing SVG Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="organic-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <motion.path
                d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                animate={{
                  d: [
                    "M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20",
                    "M25,15 Q45,20 75,25 Q85,55 75,75 Q45,80 25,75 Q15,45 25,15",
                    "M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#organic-pattern)" />
        </svg>
      </div>

      {/* Interactive Nature Elements */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating Leaves */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`leaf-${i}`}
              className="absolute text-2xl"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                x: [0, mousePosition.x * 20, 0],
                y: [0, mousePosition.y * 20, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              🍃
            </motion.div>
          ))}

          {/* Butterflies */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`butterfly-${i}`}
              className="absolute text-xl"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              🦋
            </motion.div>
          ))}

          {/* Fireflies for night mode */}
          {timeOfDay === "night" &&
            [...Array(12)].map((_, i) => (
              <motion.div
                key={`firefly-${i}`}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full shadow-lg"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: "0 0 6px #fbbf24",
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
              />
            ))}
        </div>
      )}

      {/* Main Content Container with 3D Perspective */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto w-full"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${
            mousePosition.x * 2
          }deg)`,
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Side - Text Content with Parallax */}
          <motion.div className="space-y-8" style={{ y: y2 }}>
            {/* Status Badge with Weather Info */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">
                Sustainable Agriculture Platform
              </span>
              <span className="text-lg">{currentWeather.emoji}</span>
              {audioEnabled && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-green-300 ml-2"
                >
                  🎵 Audio playing
                </motion.span>
              )}
            </motion.div>

            {/* Main Headline with Split Reveal Animation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] tracking-tight">
                <motion.span
                  className="block mb-2 overflow-hidden"
                  initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                  animate={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Nature&apos;s
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent overflow-hidden"
                  initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                  animate={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  Paradise
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle with Growing Effect */}
            <motion.p
              initial={{ opacity: 0, y: 20, scaleX: 0 }}
              animate={{ opacity: 1, y: 0, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-lg sm:text-xl text-white/80 leading-relaxed font-light max-w-lg origin-left"
            >
              Discover sustainable agriculture, biodiversity conservation, and
              farm-to-table excellence in Ghana&apos;s most beautiful valley
              ecosystem.
            </motion.p>

            {/* Action Buttons with 3D Hover Effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  rotateX: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 justify-center sm:justify-start"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span>Explore Our Farm</span>
                <motion.svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  rotateX: 5,
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                Book Experience
              </motion.button>
            </motion.div>

            {/* Stats Row with Growing Counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex gap-8 pt-4"
            >
              {[
                { number: "300+", label: "Species" },
                { number: "100%", label: "Organic" },
                { number: "50+", label: "Activities" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-white"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-2xl font-bold text-green-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced 3D Carousel */}
          <div className="relative h-96 lg:h-[500px] w-full flex items-center justify-center">
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            >
              {/* Card Container */}
              <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                {getVisibleCards().map((card) => {
                  const { position, isFocused } = card;

                  const getCardStyles = (pos) => {
                    switch (pos) {
                      case -2:
                        return {
                          x: -380,
                          scale: 0.5,
                          opacity: 0.3,
                          zIndex: 1,
                          blur: "blur-sm",
                          rotateY: 25,
                          rotateX: 5,
                        };
                      case -1:
                        return {
                          x: -200,
                          scale: 0.75,
                          opacity: 0.6,
                          zIndex: 2,
                          blur: "",
                          rotateY: 15,
                          rotateX: 2,
                        };
                      case 0:
                        return {
                          x: 0,
                          scale: 1,
                          opacity: 1,
                          zIndex: 3,
                          blur: "",
                          rotateY: 0,
                          rotateX: 0,
                        };
                      case 1:
                        return {
                          x: 200,
                          scale: 0.75,
                          opacity: 0.6,
                          zIndex: 2,
                          blur: "",
                          rotateY: -15,
                          rotateX: 2,
                        };
                      case 2:
                        return {
                          x: 380,
                          scale: 0.5,
                          opacity: 0.3,
                          zIndex: 1,
                          blur: "blur-sm",
                          rotateY: -25,
                          rotateX: 5,
                        };
                      default:
                        return {
                          x: 0,
                          scale: 0.3,
                          opacity: 0,
                          zIndex: 0,
                          blur: "blur-md",
                          rotateY: 0,
                          rotateX: 0,
                        };
                    }
                  };

                  const styles = getCardStyles(position);

                  return (
                    <motion.div
                      key={card.id}
                      animate={{
                        x: styles.x,
                        scale: styles.scale,
                        opacity: styles.opacity,
                        zIndex: styles.zIndex,
                        rotateY: styles.rotateY,
                        rotateX: styles.rotateX,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                      }}
                      className={`absolute flex items-center justify-center ${styles.blur}`}
                      style={{
                        transformOrigin: "center center",
                        transformStyle: "preserve-3d",
                      }}
                      whileHover={
                        isFocused
                          ? {
                              scale: 1.05,
                              y: -10,
                              rotateX: -5,
                              boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                            }
                          : {}
                      }
                    >
                      <div
                        className={`
                          w-80 h-96 lg:w-96 lg:h-[500px] p-6 lg:p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20
                          ${
                            isFocused
                              ? "shadow-2xl ring-2 ring-white/30"
                              : "shadow-lg"
                          }
                          transition-all duration-500 cursor-pointer flex-shrink-0 relative overflow-hidden
                        `}
                        onClick={() =>
                          !isFocused &&
                          setCurrentCardIndex(
                            (currentCardIndex +
                              position +
                              carouselCards.length) %
                              carouselCards.length
                          )
                        }
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Enhanced Gradient Background */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${
                            card.color
                          } ${
                            isFocused ? "opacity-30" : "opacity-15"
                          } rounded-3xl transition-opacity duration-500`}
                        />

                        {/* Animated Pattern Overlay */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          style={{
                            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                          }}
                        />

                        {/* Background Image with Parallax */}
                        {card.image && (
                          <div className="absolute inset-0 rounded-3xl overflow-hidden">
                            <div className="relative w-full h-full">
                              <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                                className={`object-cover transition-transform duration-300 ${
                                  isFocused ? "scale-110" : "scale-100"
                                }`}
                                style={{
                                  transform: isFocused
                                    ? `translate(${mousePosition.x * 10}px, ${
                                        mousePosition.y * 10
                                      }px)`
                                    : "none",
                                }}
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/40" />
                          </div>
                        )}

                        {/* Content with 3D Transform */}
                        <div
                          className="relative z-10 h-full flex flex-col"
                          style={{
                            transform: isFocused
                              ? "translateZ(20px)"
                              : "translateZ(0px)",
                          }}
                        >
                          {/* Icon and Stats */}
                          <div className="flex items-start justify-between mb-4 lg:mb-6">
                            <motion.div
                              className={`${
                                isFocused
                                  ? "text-4xl lg:text-5xl"
                                  : "text-3xl lg:text-4xl"
                              } transition-all duration-500 drop-shadow-lg`}
                              animate={
                                isFocused
                                  ? {
                                      rotate: [0, 5, -5, 0],
                                      scale: [1, 1.1, 1],
                                    }
                                  : {}
                              }
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {card.icon}
                            </motion.div>
                            <div className="text-right">
                              <motion.div
                                className={`${
                                  isFocused
                                    ? "text-xl lg:text-2xl"
                                    : "text-lg lg:text-xl"
                                } font-bold text-white transition-all duration-500 drop-shadow-lg`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                              >
                                {card.stat}
                              </motion.div>
                              <div
                                className={`${
                                  isFocused ? "text-xs lg:text-sm" : "text-xs"
                                } text-white/90 transition-all duration-500 drop-shadow-lg`}
                              >
                                {card.statLabel}
                              </div>
                            </div>
                          </div>

                          {/* Title */}
                          <h3
                            className={`${
                              isFocused
                                ? "text-lg lg:text-xl"
                                : "text-base lg:text-lg"
                            } font-bold text-white mb-2 lg:mb-3 transition-all duration-500 drop-shadow-lg`}
                          >
                            {card.title}
                          </h3>

                          {/* Description */}
                          <p
                            className={`text-white/90 leading-relaxed flex-grow transition-all duration-500 drop-shadow-lg ${
                              isFocused ? "text-sm" : "text-xs line-clamp-2"
                            }`}
                          >
                            {isFocused
                              ? card.description
                              : card.description.slice(0, 80) + "..."}
                          </p>

                          {/* Action Button - Enhanced for focused card */}
                          {isFocused && (
                            <motion.button
                              initial={{ opacity: 0, y: 20, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              whileHover={{
                                scale: 1.05,
                                y: -2,
                                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="mt-4 lg:mt-6 px-6 py-3 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-full backdrop-blur-sm transition-all duration-300 self-start border border-white/20"
                              style={{ transformStyle: "preserve-3d" }}
                            >
                              <span style={{ transform: "translateZ(4px)" }}>
                                Learn More
                              </span>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Carousel Indicators */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
              {carouselCards.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentCardIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentCardIndex
                      ? "bg-white w-8"
                      : "bg-white/40 w-2"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Audio Control */}
      {isMounted && !audioEnabled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 4, duration: 0.5 }}
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.volume = 0.25;
              audioRef.current
                .play()
                .then(() => {
                  setAudioEnabled(true);
                })
                .catch(console.log);
            }
          }}
          className="fixed top-4 right-4 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 group"
          whileHover={{ scale: 1.1, rotateZ: 5 }}
          whileTap={{ scale: 0.9 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl"
            style={{ transform: "translateZ(4px)" }}
          >
            🎵
          </motion.div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Enable Audio Experience
          </div>
        </motion.button>
      )}

      {/* Weather Control */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5, duration: 0.5 }}
        className="fixed top-20 right-4 z-50 flex flex-col gap-2"
      >
        <div className="text-white/60 text-xs text-center mb-1 font-medium">
          Weather
        </div>
        {weatherStates.map((weather) => (
          <motion.button
            key={weather.id}
            onClick={() => setCurrentWeather(weather)}
            className={`w-12 h-12 rounded-full backdrop-blur-md border transition-all duration-300 flex items-center justify-center text-xl ${
              currentWeather.id === weather.id
                ? "bg-white/30 border-white/50 shadow-lg"
                : "bg-white/10 border-white/20 hover:bg-white/20"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={`${weather.id} weather`}
          >
            {weather.emoji}
          </motion.button>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Hero;
