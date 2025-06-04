const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const { protect, admin } = require("../middleware/auth");
const { handleUpload } = require("../middleware/upload");

// @route   GET /api/gallery
// @desc    Get all gallery images
// @access  Public
router.get("/", async (req, res) => {
  try {
    let query = {};

    // Filter by category if provided
    if (req.query.category && req.query.category !== "all") {
      query.category = req.query.category;
    }

    const gallery = await Gallery.find(query).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   GET /api/gallery/categories
// @desc    Get all gallery categories
// @access  Public
router.get("/categories", async (req, res) => {
  try {
    const categories = await Gallery.distinct("category");

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get gallery image by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    res.json({
      success: true,
      data: galleryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   POST /api/gallery
// @desc    Create new gallery image
// @access  Private/Admin
router.post("/", protect, admin, handleUpload, async (req, res) => {
  try {
    const { alt, category, color, featured, order } = req.body;

    // Create gallery item
    const galleryItem = await Gallery.create({
      src: req.file ? `/uploads/${req.file.filename}` : req.body.src,
      alt,
      category,
      color: color || "#3B82F6",
      featured: featured === "true" ? true : false,
      order: order ? parseInt(order) : 0,
    });

    res.status(201).json({
      success: true,
      message: "Gallery image added successfully",
      data: galleryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update gallery image
// @access  Private/Admin
router.put("/:id", protect, admin, handleUpload, async (req, res) => {
  try {
    const { alt, category, color, featured, order } = req.body;

    // Find gallery item
    let galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    // Update fields
    galleryItem.alt = alt || galleryItem.alt;
    galleryItem.category = category || galleryItem.category;
    galleryItem.color = color || galleryItem.color;
    galleryItem.featured =
      featured === "true"
        ? true
        : featured === "false"
        ? false
        : galleryItem.featured;
    if (order) galleryItem.order = parseInt(order);

    // Update image if new one is uploaded
    if (req.file) {
      galleryItem.src = `/uploads/${req.file.filename}`;
    } else if (req.body.src) {
      galleryItem.src = req.body.src;
    }

    // Save updated gallery item
    await galleryItem.save();

    res.json({
      success: true,
      message: "Gallery image updated successfully",
      data: galleryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery image
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    await galleryItem.deleteOne();

    res.json({
      success: true,
      message: "Gallery image removed",
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

// @route   PUT /api/gallery/reorder
// @desc    Reorder gallery images
// @access  Private/Admin
router.put("/reorder", protect, admin, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Items array is required",
      });
    }

    // Update order for each item
    const updatePromises = items.map((item) => {
      return Gallery.findByIdAndUpdate(
        item.id,
        { order: item.order },
        { new: true }
      );
    });

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: "Gallery images reordered successfully",
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
