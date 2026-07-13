// Import express
const express = require("express");

// Create router
const router = express.Router();


// Import Controllers
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");


// ===============================
// Register Route
// POST /api/auth/register
// ===============================
router.post("/register", registerUser);


// ===============================
// Login Route
// POST /api/auth/login
// ===============================
router.post("/login", loginUser);


// Export router
module.exports = router;
