// Import required packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Import database connection
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

// Create Express app
const app = express();

// ===============================
// Middlewares
// ===============================

// Parse JSON data
app.use(express.json());

// Enable CORS
app.use(cors());

// Show API request logs
app.use(morgan("dev"));

// ===============================
// Routes
// ===============================

// Authentication Routes
app.use("/api/auth", authRoutes);

// Category Routes
app.use("/api/categories", categoryRoutes);

// Product Routes
app.use("/api/products", productRoutes);

// Cart Routes
app.use("/api/cart", cartRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Dashboard Routes
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 E-Commerce Marketplace API is Running...");
});

// ===============================
// Server Port
// ===============================

const PORT = process.env.PORT || 5000;

// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
  console.log(`✅ Server is running on Port ${PORT}`);
});
