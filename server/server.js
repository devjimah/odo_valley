const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const destinationRoutes = require("./routes/destinations");
const tourRoutes = require("./routes/tours");
const testimonialRoutes = require("./routes/testimonials");
const galleryRoutes = require("./routes/gallery");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/gallery", galleryRoutes);

// Serve admin panel in production
if (process.env.NODE_ENV === "production") {
  app.use("/admin", express.static(path.join(__dirname, "../admin/build")));

  app.get("/admin/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/build/index.html"));
  });
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/odo_valley")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
