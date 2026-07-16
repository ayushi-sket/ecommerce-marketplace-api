// Import Express
const express = require("express");
const router = express.Router();

// Import Controllers
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Import Middleware
const { protect } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const managerOrAdmin = require("../middleware/managerOrAdminMiddleware");
const upload = require("../middleware/upload");

// ==========================
// Get All Products
// GET /api/products
// ==========================
router.get("/", getAllProducts);

// ==========================
// Get Single Product
// GET /api/products/:id
// ==========================
router.get("/:id", getSingleProduct);

// ==========================
// Add Product (Admin Only)
// POST /api/products
// ==========================
router.post(
  "/",
  protect,
  adminMiddleware,
  upload.single("image"),
  addProduct
);

// ==========================
// Update Product (Manager + Admin)
// PUT /api/products/:id
// ==========================
router.put(
  "/:id",
  protect,
  managerOrAdmin,
  upload.single("image"),
  updateProduct
);

// ==========================
// Delete Product (Admin Only)
// DELETE /api/products/:id
// ==========================
router.delete(
  "/:id",
  protect,
  adminMiddleware,
  deleteProduct
);

// Export Router
module.exports = router;
