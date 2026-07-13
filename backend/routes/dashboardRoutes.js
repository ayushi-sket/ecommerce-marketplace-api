const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");

const { protect, admin } = require("../middleware/authMiddleware");

// Dashboard (Admin Only)
router.get("/", protect, admin, getDashboard);

module.exports = router;
