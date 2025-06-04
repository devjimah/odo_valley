const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const { protect, admin } = require("../middleware/auth");
const { handleUpload } = require("../middleware/upload");

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   GET /api/testimonials/:id
// @desc    Get testimonial by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   POST /api/testimonials
// @desc    Create new testimonial
// @access  Private/Admin
router.post("/", protect, admin, handleUpload, async (req, res) => {
  try {
    const { name, role, content, location, rating, color, featured } = req.body;

    // Create testimonial
    const testimonial = await Testimonial.create({
      name,
      role,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
      content,
      location,
      rating: rating ? parseFloat(rating) : 5,
      color: color || "#3B82F6",
      featured: featured === "true" ? true : false,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial
// @access  Private/Admin
router.put("/:id", protect, admin, handleUpload, async (req, res) => {
  try {
    const { name, role, content, location, rating, color, featured } = req.body;

    // Find testimonial
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Update fields
    testimonial.name = name || testimonial.name;
    testimonial.role = role || testimonial.role;
    testimonial.content = content || testimonial.content;
    testimonial.location = location || testimonial.location;
    if (rating) testimonial.rating = parseFloat(rating);
    testimonial.color = color || testimonial.color;
    testimonial.featured =
      featured === "true"
        ? true
        : featured === "false"
        ? false
        : testimonial.featured;

    // Update image if new one is uploaded
    if (req.file) {
      testimonial.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      testimonial.image = req.body.image;
    }

    // Save updated testimonial
    await testimonial.save();

    res.json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    await testimonial.deleteOne();

    res.json({
      success: true,
      message: "Testimonial removed",
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
