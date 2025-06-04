const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#3B82F6",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
GallerySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Gallery", GallerySchema);
