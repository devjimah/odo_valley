"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const Bookings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("accommodation");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("residency");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const accommodationOptions = [
    {
      type: "Luxury Tree House",
      image: "/assets/images/photo_14_2025-06-23_04-00-34.jpg",
      price: "₵450/night",
      features: ["Forest View", "Private Balcony", "Organic Breakfast", "WiFi"],
      capacity: "2 guests",
    },
    {
      type: "Safari Tent",
      image: "/assets/images/photo_15_2025-06-23_04-00-34.jpg",
      price: "₵320/night",
      features: [
        "Nature Sounds",
        "Shared Bathroom",
        "Camping Experience",
        "Fire Pit",
      ],
      capacity: "4 guests",
    },
    {
      type: "Eco Lodge",
      image: "/assets/images/photo_16_2025-06-23_04-00-34.jpg",
      price: "₵680/night",
      features: ["Mountain View", "Private Kitchen", "Solar Power", "Garden"],
      capacity: "6 guests",
    },
  ];

  const restaurantMenu = [
    {
      category: "Traditional Dishes",
      items: [
        {
          name: "Jollof Rice with Grilled Tilapia",
          price: "₵45",
          description: "Local spices, organic vegetables",
        },
        {
          name: "Banku with Okra Stew",
          price: "₵35",
          description: "Farm-fresh ingredients",
        },
        {
          name: "Kelewele with Groundnut Soup",
          price: "₵40",
          description: "Spicy plantain, rich groundnut",
        },
      ],
    },
    {
      category: "Farm-to-Table Specials",
      items: [
        {
          name: "Organic Garden Salad",
          price: "₵25",
          description: "Fresh from our gardens",
        },
        {
          name: "Grilled Free-Range Chicken",
          price: "₵55",
          description: "With local herbs and vegetables",
        },
        {
          name: "Vegetarian Plantain Curry",
          price: "₵30",
          description: "Coconut milk, garden vegetables",
        },
      ],
    },
  ];

  return (
    <section id="residency" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bookings & Restaurant
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Experience authentic Ghanaian hospitality with our eco-friendly
            accommodations and farm-to-table dining experiences.
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
              { id: "accommodation", label: "Accommodation" },
              { id: "restaurant", label: "Restaurant" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedTab === tab.id
                    ? "bg-green-600 text-white shadow-md"
                    : "text-white/80 hover:text-green-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Accommodation Section */}
        {selectedTab === "accommodation" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {accommodationOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={option.image}
                      alt={option.type}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {option.type}
                      </h3>
                      <span className="text-lg font-bold text-green-600">
                        {option.price}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Up to {option.capacity}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {option.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-600"
                        >
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Booking CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 backdrop-blur-md rounded-2xl p-12 text-center text-white border border-green-400/30"
            >
              <h3 className="text-3xl font-bold mb-4">Plan Your Stay</h3>
              <p className="text-xl mb-8 opacity-90">
                Experience the tranquility of nature with modern comfort
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Check Availability
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  View Gallery
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Restaurant Section */}
        {selectedTab === "restaurant" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {restaurantMenu.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                    {category.category}
                  </h3>
                  <div className="space-y-6">
                    {category.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-green-600 ml-4">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Restaurant CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 backdrop-blur-md rounded-2xl p-12 text-center text-white border border-green-400/30"
            >
              <h3 className="text-3xl font-bold mb-4">Taste of Ghana</h3>
              <p className="text-xl mb-8 opacity-90">
                Authentic flavors using fresh ingredients from our organic farm
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Make Reservation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  View Full Menu
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Bookings;
