const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");
const { protect, admin } = require("../middleware/authMiddleware");

// Dashboard (Admin Only) — full stats
router.get("/", protect, admin, getDashboard);

// Dashboard (Manager + Admin) — same stats, manager will show limited fields on frontend
router.get("/manager", protect, (req, res, next) => {
  if (req.user.role !== "manager" && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Manager only",
    });
  }
  next();
}, getDashboard);

module.exports = router;
