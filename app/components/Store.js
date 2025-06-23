"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const Store = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("products");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("store");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const products = [
    {
      name: "Organic Honey",
      price: "₵25",
      image: "/assets/images/photo_3_2025-06-23_04-00-34.jpg",
      description: "Pure wildflower honey from our bee conservation program",
      category: "Food",
    },
    {
      name: "Herbal Tea Blend",
      price: "₵18",
      image: "/assets/images/photo_6_2025-06-23_04-00-34.jpg",
      description: "Traditional medicinal plants grown on our farm",
      category: "Beverages",
    },
    {
      name: "Handwoven Baskets",
      price: "₵45",
      image: "/assets/images/photo_9_2025-06-23_04-00-34.jpg",
      description: "Traditional crafts made by local artisans",
      category: "Crafts",
    },
    {
      name: "Organic Shea Butter",
      price: "₵35",
      image: "/assets/images/photo_12_2025-06-23_04-00-34.jpg",
      description: "Pure, unrefined shea butter from local cooperatives",
      category: "Beauty",
    },
    {
      name: "Kente Accessories",
      price: "₵65",
      image: "/assets/images/photo_17_2025-06-23_04-00-34.jpg",
      description: "Authentic Kente cloth accessories",
      category: "Fashion",
    },
    {
      name: "Organic Spice Mix",
      price: "₵15",
      image: "/assets/images/photo_8_2025-06-23_04-00-34.jpg",
      description: "Farm-grown spices for traditional Ghanaian cooking",
      category: "Food",
    },
  ];

  const events = [
    {
      title: "Cultural Heritage Festival",
      date: "March 15-17, 2024",
      image: "🎭",
      description:
        "Celebrate Ghanaian culture with traditional music, dance, and crafts",
      price: "₵50/person",
      highlights: [
        "Traditional Performances",
        "Craft Workshops",
        "Local Cuisine",
      ],
    },
    {
      title: "Farm-to-Table Workshop",
      date: "April 8, 2024",
      image: "👨‍🌾",
      description:
        "Learn sustainable farming and cooking with organic ingredients",
      price: "₵75/person",
      highlights: ["Farming Techniques", "Cooking Class", "Organic Lunch"],
    },
    {
      title: "Wildlife Conservation Talk",
      date: "May 22, 2024",
      image: "🦅",
      description: "Educational session on local wildlife conservation efforts",
      price: "Free",
      highlights: ["Expert Speakers", "Bird Watching", "Nature Walk"],
    },
    {
      title: "Traditional Craft Fair",
      date: "June 10-11, 2024",
      image: "🎨",
      description: "Showcase of local artisans and traditional crafts",
      price: "₵30/person",
      highlights: ["Artisan Demonstrations", "Shopping", "Live Music"],
    },
  ];

  return (
    <section id="store" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Store & Events
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover authentic Ghanaian products and join our cultural events
            that celebrate tradition and sustainability.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-green-600/20 backdrop-blur-md rounded-full p-2 shadow-lg border border-green-400/30">
            {[
              { id: "products", label: "Products" },
              { id: "events", label: "Events" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === tab.id
                    ? "bg-green-600 text-white shadow-md"
                    : "text-white/80 hover:text-green-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Section */}
        {selectedCategory === "products" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <span className="text-lg font-bold text-green-600">
                        {product.price}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {product.category}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Store CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 backdrop-blur-md rounded-2xl p-12 text-center text-white border border-green-400/30"
            >
              <h3 className="text-3xl font-bold mb-4">
                Support Local Artisans
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Every purchase supports local communities and sustainable
                practices
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  View All Products
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Wholesale Inquiry
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Events Section */}
        {selectedCategory === "events" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-6xl">
                    {event.image}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <span className="text-lg font-bold text-green-600">
                        {event.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{event.date}</p>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Highlights:
                      </h4>
                      <ul className="space-y-1">
                        {event.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-600 text-sm"
                          >
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Register Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Events CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 backdrop-blur-md rounded-2xl p-12 text-center text-white border border-green-400/30"
            >
              <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
              <p className="text-xl mb-8 opacity-90">
                Be part of meaningful events that celebrate culture and
                sustainability
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  View Event Calendar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Subscribe to Updates
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Store;
