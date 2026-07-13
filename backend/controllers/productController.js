// Import Product Model
const Product = require("../models/Product");

// Import Category Model
const Category = require("../models/Category");



// ==========================
// Add New Product
// POST /api/products
// ==========================
const addProduct = async (req, res) => {
  try {

    // Get product data
    const {
      name,
      description,
      price,
      stock,
      category,
      image,
    } = req.body;


    // Check required fields
    if (!name || !description || price === undefined || stock === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }


    // Check category exists
    const categoryExists = await Category.findById(category);


    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }


    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image,
    });


    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ==========================
// Get All Products
// GET /api/products
// ==========================
const getAllProducts = async (req, res) => {
  try {


    const products = await Product.find()
      .populate("category", "name");


    res.status(200).json({
      success: true,
      totalProducts: products.length,
      products,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ==========================
// Get Single Product
// GET /api/products/:id
// ==========================
const getSingleProduct = async (req, res) => {
  try {


    const { id } = req.params;


    const product = await Product.findById(id)
      .populate("category", "name");


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }


    res.status(200).json({
      success: true,
      product,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ==========================
// Update Product
// PUT /api/products/:id
// ==========================
const updateProduct = async (req, res) => {
  try {


    // Get product id
    const { id } = req.params;


    // Get updated data
    const {
      name,
      description,
      price,
      stock,
      category,
      image,
    } = req.body;


    // Update product
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        stock,
        category,
        image,
      },
      {
        new: true,
      }
    );


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ==========================
// Delete Product
// DELETE /api/products/:id
// ==========================
const deleteProduct = async (req, res) => {
  try {


    const { id } = req.params;


    const product = await Product.findByIdAndDelete(id);


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ==========================
// Export Controllers
// ==========================
module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
