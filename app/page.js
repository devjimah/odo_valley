"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Biodiversity from "./components/Biodiversity";
import Bookings from "./components/Bookings";
import Store from "./components/Store";
import Contact from "./components/Contact";
import dynamic from "next/dynamic";

// Dynamically import ScrollToTop to avoid hydration errors
const DynamicScrollToTop = dynamic(() => import("./components/ScrollToTop"), {
  ssr: false,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Delay DOM manipulation to ensure hydration is complete
    const timer = setTimeout(() => {
      // Simple anchor link smooth scrolling
      const handleAnchorClick = (e) => {
        const href = e.currentTarget.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.replace("#", "");
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });
          }
        }
      };

      // Add click event listeners to all anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", handleAnchorClick);
      });

      // Clean up event listeners
      return () => {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.removeEventListener("click", handleAnchorClick);
        });
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <Biodiversity />
      <Bookings />
      <Store />
      <Contact />
      {isClient && <DynamicScrollToTop />}
    </main>
  );
}
