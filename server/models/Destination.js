const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5,
  },
  price: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#3B82F6",
  },
  tags: {
    type: [String],
    default: [],
  },
  highlights: {
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
DestinationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Destination", DestinationSchema);
