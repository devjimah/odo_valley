import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    hidden: {
      opacity: 0,
      y: -25,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 20,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Destinations", href: "#services" },
    { name: "Tours", href: "#tours" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      variants={navVariants}
      animate={hidden ? "hidden" : "visible"}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white dark:bg-gray-900 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500"
        >
          Odo Travels
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {navLinks.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <motion.div
                    variants={linkVariants}
                    whileHover="hover"
                    className="cursor-pointer font-medium"
                  >
                    {item.name}
                  </motion.div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile menu panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-[72px] right-0 bottom-0 w-3/4 max-w-sm bg-white dark:bg-gray-900 z-50 shadow-xl flex flex-col md:hidden"
            >
              <nav className="flex flex-col p-4">
                <ul className="flex flex-col space-y-4">
                  {navLinks.map((item) => (
                    <motion.li key={item.name} variants={menuItemVariants}>
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block py-2 px-4 text-lg font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
