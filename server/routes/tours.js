const express = require("express");
const router = express.Router();
const Tour = require("../models/Tour");
const { protect, admin } = require("../middleware/auth");
const { handleUpload } = require("../middleware/upload");

// @route   GET /api/tours
// @desc    Get all tours
// @access  Public
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   GET /api/tours/:id
// @desc    Get tour by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   POST /api/tours
// @desc    Create new tour
// @access  Private/Admin
router.post("/", protect, admin, handleUpload, async (req, res) => {
  try {
    const {
      title,
      description,
      days,
      price,
      rating,
      color,
      features,
      locations,
      featured,
    } = req.body;

    // Process features and locations if they come as strings
    const processedFeatures = features
      ? typeof features === "string"
        ? JSON.parse(features)
        : features
      : [];
    const processedLocations = locations
      ? typeof locations === "string"
        ? JSON.parse(locations)
        : locations
      : [];

    // Create tour
    const tour = await Tour.create({
      title,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
      days: parseInt(days),
      price: parseFloat(price),
      rating: rating ? parseFloat(rating) : 4.5,
      color: color || "#3B82F6",
      features: processedFeatures,
      locations: processedLocations,
      featured: featured === "true" ? true : false,
    });

    res.status(201).json({
      success: true,
      message: "Tour created successfully",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   PUT /api/tours/:id
// @desc    Update tour
// @access  Private/Admin
router.put("/:id", protect, admin, handleUpload, async (req, res) => {
  try {
    const {
      title,
      description,
      days,
      price,
      rating,
      color,
      features,
      locations,
      featured,
    } = req.body;

    // Find tour
    let tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // Process features and locations if they come as strings
    const processedFeatures = features
      ? typeof features === "string"
        ? JSON.parse(features)
        : features
      : tour.features;
    const processedLocations = locations
      ? typeof locations === "string"
        ? JSON.parse(locations)
        : locations
      : tour.locations;

    // Update fields
    tour.title = title || tour.title;
    tour.description = description || tour.description;
    if (days) tour.days = parseInt(days);
    if (price) tour.price = parseFloat(price);
    if (rating) tour.rating = parseFloat(rating);
    tour.color = color || tour.color;
    tour.features = processedFeatures;
    tour.locations = processedLocations;
    tour.featured =
      featured === "true" ? true : featured === "false" ? false : tour.featured;

    // Update image if new one is uploaded
    if (req.file) {
      tour.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      tour.image = req.body.image;
    }

    // Save updated tour
    await tour.save();

    res.json({
      success: true,
      message: "Tour updated successfully",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   DELETE /api/tours/:id
// @desc    Delete tour
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    await tour.deleteOne();

    res.json({
      success: true,
      message: "Tour removed",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
