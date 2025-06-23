"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const Biodiversity = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("farm");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const farmFeatures = [
    {
      icon: "🌿",
      title: "Native Species",
      description:
        "Home to hundreds of indigenous plant species, carefully preserved and protected.",
      image: "/assets/images/photo_2_2025-06-23_04-00-34.jpg",
    },
    {
      icon: "🦋",
      title: "Wildlife Haven",
      description:
        "A sanctuary for local wildlife, providing crucial habitats for diverse species.",
      image: "/assets/images/photo_5_2025-06-23_04-00-34.jpg",
    },
    {
      icon: "🌱",
      title: "Sustainable Farming",
      description:
        "Traditional farming methods that work in harmony with natural ecosystems.",
      image: "/assets/images/photo_8_2025-06-23_04-00-34.jpg",
    },
    {
      icon: "🍃",
      title: "Conservation",
      description:
        "Active conservation programs to protect and restore natural habitats.",
      image: "/assets/images/photo_10_2025-06-23_04-00-34.jpg",
    },
  ];

  return (
    <section id="farm" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Biodiversity & Conservation
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover the rich ecosystem of Odo Valley, where traditional farming
            meets modern conservation efforts to preserve Ghana's natural
            heritage.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
        >
          {[
            { number: "150+", label: "Plant Species" },
            { number: "50+", label: "Bird Species" },
            { number: "25", label: "Acres Protected" },
            { number: "100%", label: "Organic Certified" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {stat.number}
              </div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {farmFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Farm Tour CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 backdrop-blur-md rounded-2xl p-12 text-center text-white border border-green-400/30"
        >
          <h3 className="text-3xl font-bold mb-4">Experience Our Farm</h3>
          <p className="text-xl mb-8 opacity-90">
            Join our guided tours to learn about sustainable farming and
            conservation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Farm Tour
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Download Guide
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Biodiversity;
