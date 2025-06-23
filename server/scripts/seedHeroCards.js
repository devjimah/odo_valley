const mongoose = require("mongoose");
const HeroCard = require("../models/HeroCard");
require("dotenv").config();

// Sample hero cards with Unsplash images
const sampleHeroCards = [
  {
    title: "Biodiversity",
    description:
      "Discover 300+ native species thriving in our protected ecosystem. Experience the rich tapestry of life that calls Odo Valley home.",
    icon: "🌱",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
    stat: "300+",
    statLabel: "Species",
    color: "from-green-400 to-emerald-500",
    order: 1,
    isActive: true,
  },
  {
    title: "Organic Farming",
    description:
      "100% sustainable practices with zero chemical interventions. Learn traditional farming methods passed down through generations.",
    icon: "🍃",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop&crop=center",
    stat: "100%",
    statLabel: "Organic",
    color: "from-emerald-400 to-teal-500",
    order: 2,
    isActive: true,
  },
  {
    title: "Eco Tourism",
    description:
      "Immersive farm experiences that connect you with nature. Guided tours through our sustainable agricultural paradise.",
    icon: "🦋",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&crop=center",
    stat: "50+",
    statLabel: "Activities",
    color: "from-teal-400 to-cyan-500",
    order: 3,
    isActive: true,
  },
  {
    title: "Harvest Tours",
    description:
      "Join our seasonal harvest and learn traditional farming methods. Experience the joy of working with the land.",
    icon: "🌾",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center",
    stat: "4",
    statLabel: "Seasons",
    color: "from-yellow-400 to-orange-500",
    order: 4,
    isActive: true,
  },
  {
    title: "Farm Stay",
    description:
      "Overnight experiences in our eco-friendly accommodations. Wake up to the sounds of nature every morning.",
    icon: "🏡",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center",
    stat: "24/7",
    statLabel: "Access",
    color: "from-orange-400 to-red-500",
    order: 5,
    isActive: true,
  },
];

async function seedHeroCards() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/odo_valley"
    );
    console.log("Connected to MongoDB");

    // Clear existing hero cards
    await HeroCard.deleteMany({});
    console.log("Cleared existing hero cards");

    // Insert sample hero cards
    const heroCards = await HeroCard.insertMany(sampleHeroCards);
    console.log(`Inserted ${heroCards.length} hero cards`);

    // Display inserted cards
    heroCards.forEach((card) => {
      console.log(`- ${card.title} (Order: ${card.order})`);
    });

    console.log("Hero cards seeded successfully!");
  } catch (error) {
    console.error("Error seeding hero cards:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seed function
if (require.main === module) {
  seedHeroCards();
}

module.exports = seedHeroCards;
