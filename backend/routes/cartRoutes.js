// Import Express
const express = require("express");
const router = express.Router();

// Import Controllers
const {
  addToCart,
  getMyCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

// Import Middleware
const { protect } = require("../middleware/authMiddleware");


// ==========================
// Add Product To Cart
// POST /api/cart
// ==========================
router.post("/", protect, addToCart);


// ==========================
// Get My Cart
// GET /api/cart
// ==========================
router.get("/", protect, getMyCart);


// ==========================
// Update Cart Quantity
// PUT /api/cart/:productId
// ==========================
router.put("/:productId", protect, updateCartQuantity);


// ==========================
// Remove Item From Cart
// DELETE /api/cart/:productId
// ==========================
router.delete("/:productId", protect, removeFromCart);


// ==========================
// Clear Cart
// DELETE /api/cart
// ==========================
router.delete("/", protect, clearCart);


// Export Router
module.exports = router;
