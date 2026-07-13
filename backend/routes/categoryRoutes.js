// Import Express
const express = require("express");
const router = express.Router();


// Import Controllers
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");


// Import Middlewares
const { protect } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");



// ==========================
// Get All Categories
// GET /api/categories
// ==========================
router.get("/", getAllCategories);



// ==========================
// Create Category (Admin Only)
// POST /api/categories
// ==========================
router.post(
  "/",
  protect,
  adminMiddleware,
  createCategory
);



// ==========================
// Update Category (Admin Only)
// PUT /api/categories/:id
// ==========================
router.put(
  "/:id",
  protect,
  adminMiddleware,
  updateCategory
);



// ==========================
// Delete Category (Admin Only)
// DELETE /api/categories/:id
// ==========================
router.delete(
  "/:id",
  protect,
  adminMiddleware,
  deleteCategory
);



// Export Router
module.exports = router;
