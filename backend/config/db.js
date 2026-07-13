// Import mongoose
const mongoose = require("mongoose");

// Force Node.js to use IPv4 first
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

// Function to connect MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
