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
// Add Product
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
// Update Product
// PUT /api/products/:id
// ==========================
router.put(
  "/:id",
  protect,
  adminMiddleware,
  upload.single("image"),
  updateProduct
);

// ==========================
// Delete Product
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
