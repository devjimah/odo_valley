const mongoose = require("mongoose");
const User = require("../models/User");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/odo_valley")
  .then(() => console.log("MongoDB connected for admin creation"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Admin data
const adminData = {
  username: "admin",
  email: "admin@odovalley.com",
  password: "admin123",
  role: "admin",
};

// Create admin user
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });

    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create new admin user
    const admin = await User.create(adminData);

    console.log("Admin user created successfully:");
    console.log({
      username: admin.username,
      email: admin.email,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

// Run the function
createAdmin();
