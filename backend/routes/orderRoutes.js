const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  protect,
  adminOrManager,
} = require("../middleware/authMiddleware");

// ===============================
// Customer Routes
// ===============================

// Place Order
router.post("/", protect, placeOrder);

// Get Logged-in User Orders
router.get("/my-orders", protect, getMyOrders);

// Get Order By ID
router.get("/:id", protect, getOrderById);

// ===============================
// Admin & Manager Routes
// ===============================

// Get All Orders
router.get("/", protect, adminOrManager, getAllOrders);

// Update Order Status
router.put("/:id/status", protect, adminOrManager, updateOrderStatus);

module.exports = router;
