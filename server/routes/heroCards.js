const express = require("express");
const router = express.Router();
const HeroCard = require("../models/HeroCard");
const { protect } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

// Validation rules
const heroCardValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be 1-100 characters"),
  body("description")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Description must be 1-500 characters"),
  body("icon")
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage("Icon must be provided"),
  body("image").isURL().withMessage("Image must be a valid URL"),
  body("stat")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Stat must be 1-20 characters"),
  body("statLabel")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Stat label must be 1-50 characters"),
  body("color")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Color must be provided"),
  body("order")
    .isInt({ min: 0 })
    .withMessage("Order must be a non-negative integer"),
];

// GET /api/hero-cards - Get all hero cards (public)
router.get("/", async (req, res) => {
  try {
    const heroCards = await HeroCard.find({ isActive: true })
      .sort({ order: 1 })
      .select("-__v");

    res.json({
      success: true,
      data: heroCards,
    });
  } catch (error) {
    console.error("Error fetching hero cards:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hero cards",
    });
  }
});

// GET /api/hero-cards/admin - Get all hero cards for admin (including inactive)
router.get("/admin", protect, async (req, res) => {
  try {
    const heroCards = await HeroCard.find().sort({ order: 1 }).select("-__v");

    res.json({
      success: true,
      data: heroCards,
    });
  } catch (error) {
    console.error("Error fetching hero cards for admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hero cards",
    });
  }
});

// GET /api/hero-cards/:id - Get single hero card
router.get("/:id", async (req, res) => {
  try {
    const heroCard = await HeroCard.findById(req.params.id).select("-__v");

    if (!heroCard) {
      return res.status(404).json({
        success: false,
        message: "Hero card not found",
      });
    }

    res.json({
      success: true,
      data: heroCard,
    });
  } catch (error) {
    console.error("Error fetching hero card:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hero card",
    });
  }
});

// POST /api/hero-cards - Create new hero card
router.post("/", protect, heroCardValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const heroCard = new HeroCard(req.body);
    await heroCard.save();

    res.status(201).json({
      success: true,
      message: "Hero card created successfully",
      data: heroCard,
    });
  } catch (error) {
    console.error("Error creating hero card:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create hero card",
    });
  }
});

// PUT /api/hero-cards/:id - Update hero card
router.put("/:id", protect, heroCardValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const heroCard = await HeroCard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!heroCard) {
      return res.status(404).json({
        success: false,
        message: "Hero card not found",
      });
    }

    res.json({
      success: true,
      message: "Hero card updated successfully",
      data: heroCard,
    });
  } catch (error) {
    console.error("Error updating hero card:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update hero card",
    });
  }
});

// DELETE /api/hero-cards/:id - Delete hero card
router.delete("/:id", protect, async (req, res) => {
  try {
    const heroCard = await HeroCard.findByIdAndDelete(req.params.id);

    if (!heroCard) {
      return res.status(404).json({
        success: false,
        message: "Hero card not found",
      });
    }

    res.json({
      success: true,
      message: "Hero card deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hero card:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete hero card",
    });
  }
});

// PUT /api/hero-cards/:id/toggle - Toggle hero card active status
router.put("/:id/toggle", protect, async (req, res) => {
  try {
    const heroCard = await HeroCard.findById(req.params.id);

    if (!heroCard) {
      return res.status(404).json({
        success: false,
        message: "Hero card not found",
      });
    }

    heroCard.isActive = !heroCard.isActive;
    await heroCard.save();

    res.json({
      success: true,
      message: `Hero card ${
        heroCard.isActive ? "activated" : "deactivated"
      } successfully`,
      data: heroCard,
    });
  } catch (error) {
    console.error("Error toggling hero card status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle hero card status",
    });
  }
});

module.exports = router;
