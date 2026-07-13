// Import Category Model
const Category = require("../models/Category");



// ==========================
// Create New Category
// POST /api/categories
// ==========================
const createCategory = async (req, res) => {
  try {

    // Get category name from body
    const { name } = req.body;


    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }


    // Check category already exists
    const categoryExists = await Category.findOne({ name });


    if (categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }


    // Create category
    const category = await Category.create({
      name,
    });


    // Response
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// ==========================
// Get All Categories
// GET /api/categories
// ==========================
const getAllCategories = async (req, res) => {
  try {


    // Find all categories
    const categories = await Category.find();


    // Response
    res.status(200).json({
      success: true,
      totalCategories: categories.length,
      categories,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// ==========================
// Update Category
// PUT /api/categories/:id
// ==========================
const updateCategory = async (req, res) => {
  try {


    // Get id from URL
    const { id } = req.params;


    // Get new category name
    const { name } = req.body;


    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }


    // Update category
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
      },
      {
        new: true,
      }
    );


    // Check category exists
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }


    // Response
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ==========================
// Delete Category
// DELETE /api/categories/:id
// ==========================
const deleteCategory = async (req, res) => {
  try {


    // Get category id
    const { id } = req.params;


    // Delete category
    const category = await Category.findByIdAndDelete(id);


    // Check category exists
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }


    // Success response
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
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
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
