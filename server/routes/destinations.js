const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");
const { protect, admin } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { validateDestination } = require("../utils/validation");

// @route   GET /api/destinations
// @desc    Get all destinations
// @access  Public
router.get("/", async (req, res) => {
  try {
    let query = {};

    // Apply filters if provided
    if (req.query.featured === "true") {
      query.featured = true;
    }

    const destinations = await Destination.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   GET /api/destinations/:id
// @desc    Get destination by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.json({
      success: true,
      data: destination,
    });
  } catch (error) {
    console.error("Error fetching destination by ID:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   POST /api/destinations
// @desc    Create new destination
// @access  Private/Admin
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  try {
    // Validate request data
    const validation = validateDestination(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const {
      title,
      description,
      price,
      rating,
      color,
      tags,
      highlights,
      featured,
    } = req.body;

    // Process tags and highlights if they come as strings
    const processedTags = tags
      ? typeof tags === "string"
        ? JSON.parse(tags)
        : tags
      : [];
    const processedHighlights = highlights
      ? typeof highlights === "string"
        ? JSON.parse(highlights)
        : highlights
      : [];

    // Create destination
    const destination = await Destination.create({
      title,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
      price,
      rating: rating || 4.5,
      color: color || "#3B82F6",
      tags: processedTags,
      highlights: processedHighlights,
      featured: featured === "true" ? true : false,
    });

    res.status(201).json({
      success: true,
      message: "Destination created successfully",
      data: destination,
    });
  } catch (error) {
    console.error("Error creating destination:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   PUT /api/destinations/:id
// @desc    Update destination
// @access  Private/Admin
router.put("/:id", protect, admin, upload.single("image"), async (req, res) => {
  try {
    // Validate request data
    const validation = validateDestination(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const {
      title,
      description,
      price,
      rating,
      color,
      tags,
      highlights,
      featured,
    } = req.body;

    // Find destination
    let destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // Process tags and highlights if they come as strings
    const processedTags = tags
      ? typeof tags === "string"
        ? JSON.parse(tags)
        : tags
      : destination.tags;
    const processedHighlights = highlights
      ? typeof highlights === "string"
        ? JSON.parse(highlights)
        : highlights
      : destination.highlights;

    // Update fields
    destination.title = title || destination.title;
    destination.description = description || destination.description;
    destination.price = price || destination.price;
    destination.rating = rating || destination.rating;
    destination.color = color || destination.color;
    destination.tags = processedTags;
    destination.highlights = processedHighlights;
    destination.featured =
      featured === "true"
        ? true
        : featured === "false"
        ? false
        : destination.featured;

    // Update image if new one is uploaded
    if (req.file) {
      destination.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      destination.image = req.body.image;
    }

    // Save updated destination
    await destination.save();

    // Return updated destination
    const updatedDestination = await Destination.findById(req.params.id);

    res.json({
      success: true,
      message: "Destination updated successfully",
      data: updatedDestination,
    });
  } catch (error) {
    console.error("Error updating destination:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   DELETE /api/destinations/:id
// @desc    Delete destination
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    await destination.deleteOne();

    res.json({
      success: true,
      message: "Destination removed",
      data: { id: req.params.id },
    });
  } catch (error) {
    console.error("Error deleting destination:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
