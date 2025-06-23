"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const GlobalVideoBackground = () => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Ensure video stays muted to allow audio from other components
  useEffect(() => {
    if (videoRef.current && isMounted) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
  }, [isLoaded, isMounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-400" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  return (
    <>
      {/* Global Video Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <motion.video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={true}
          playsInline
          poster="/images/nature-poster.jpg"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <source src="/assets/video/odovalley.mp4" type="video/mp4" />
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-400" />
        </motion.video>

        {/* Global overlay for better content readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Subtle animated particles for extra atmosphere */}
      {isMounted && (
        <div className="fixed inset-0 pointer-events-none z-1">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GlobalVideoBackground;
