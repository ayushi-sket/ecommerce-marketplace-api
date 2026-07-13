const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  searchUsers,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");

// ===============================
// Admin Routes
// ===============================

// Get All Users
router.get("/", protect, admin, getAllUsers);

// Search Users
router.get("/search", protect, admin, searchUsers);

// ===============================
// Customer Routes
// ===============================

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

module.exports = router;
