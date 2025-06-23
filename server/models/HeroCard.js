const mongoose = require("mongoose");

const heroCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      default: "🌱",
    },
    image: {
      type: String, // URL to image (Unsplash or uploaded)
      required: true,
    },
    stat: {
      type: String,
      required: true,
    },
    statLabel: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      default: "from-green-400 to-emerald-500",
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for ordering
heroCardSchema.index({ order: 1 });

module.exports = mongoose.model("HeroCard", heroCardSchema);
