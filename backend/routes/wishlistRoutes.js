const express = require("express");
const router = express.Router();

const {
  getWishlist,
  toggleWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

// Get logged-in user's wishlist
router.get("/", protect, getWishlist);

// Toggle a product in/out of wishlist
router.put("/:productId", protect, toggleWishlist);

module.exports = router;
