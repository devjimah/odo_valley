import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isMounted) return;
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted]);

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

  const navLinks = [
    {
      name: "Biodiversity",
      href: "#farm",
    },
    {
      name: "Bookings & Restaurant",
      href: "#residency",
    },
    {
      name: "Store & Events",
      href: "#store",
    },
    {
      name: "Contact",
      href: "#contact",
    },
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
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={handleLinkClick}
          >
            <Image
              src="/assets/images/logo.jpg"
              alt="Odo Valley Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-gray-900">Odo Valley</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
            {navLinks.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full text-sm font-medium text-white hover:text-white hover:bg-green-500/80 hover:backdrop-blur-sm transition-all duration-200 cursor-pointer"
                  >
                    {item.name}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Right Side - Sign In/Sign Up */}
        <div className="hidden lg:flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Sign In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition-colors"
          >
            Book Stay
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <motion.button
            onClick={toggleMenu}
            className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Toggle mobile menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
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
            </motion.svg>
          </motion.button>
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
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-white/10 backdrop-blur-md shadow-lg border border-white/20 z-50 lg:hidden"
            >
              <nav className="p-6">
                <ul className="space-y-4">
                  {navLinks.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block py-3 px-4 text-white hover:text-white hover:bg-green-500/80 hover:backdrop-blur-sm rounded-lg transition-all duration-200 font-medium"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile auth buttons */}
                <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                  <button className="w-full py-3 px-4 bg-green-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-green-700/80 transition-all duration-200 font-medium">
                    Book Stay
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
