"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Destinations from "./components/Services";
import Tours from "./components/Tours";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import dynamic from "next/dynamic";

// Dynamically import GSAP ScrollTrigger to avoid hydration errors
const DynamicScrollToTop = dynamic(() => import("./components/ScrollToTop"), {
  ssr: false,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Simple anchor link smooth scrolling without GSAP
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
  }, []);

  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <Destinations />
      <Tours />
      <Gallery />
      <About />
      <Contact />
      <Footer />
      {isClient && <DynamicScrollToTop />}
    </main>
  );
}
