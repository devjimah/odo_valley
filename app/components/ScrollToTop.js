import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Use window.scrollTo for simple scrolling without GSAP
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  // Only render on client side to avoid hydration issues
  if (!isClient) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          aria-label="Scroll to top"
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
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
