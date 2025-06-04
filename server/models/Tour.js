const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5,
  },
  color: {
    type: String,
    default: "#3B82F6",
  },
  features: {
    type: [String],
    default: [],
  },
  locations: {
    type: [String],
    default: [],
  },
  featured: {
    type: Boolean,
    default: false,
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
TourSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Tour", TourSchema);
