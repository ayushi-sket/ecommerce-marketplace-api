const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

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
// Admin Routes
// ===============================

// Get All Orders
router.get("/", protect, admin, getAllOrders);

// Update Order Status
router.put("/:id/status", protect, admin, updateOrderStatus);


module.exports = router;
