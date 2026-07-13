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

    const {
      name,
      description,
      price,
      stock,
      category,
      image,
    } = req.body;


    if (!name || !description || price === undefined || stock === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }


    const categoryExists = await Category.findById(category);


    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }


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
// Search Example:
// /api/products?search=phone
// Filter Example:
// /api/products?category=id
// ==========================
const getAllProducts = async (req, res) => {
  try {

    const { search, category } = req.query;


    let query = {};


    // Search Product Name
    if (search) {

      query.name = {
        $regex: search,
        $options: "i",
      };

    }



    // Filter Category
    if (category) {

      query.category = category;

    }



    const products = await Product.find(query)
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
        success:false,
        message:"Product not found",
      });

    }



    res.status(200).json({
      success:true,
      product,
    });



  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};







// ==========================
// Update Product
// PUT /api/products/:id
// ==========================
const updateProduct = async (req,res)=>{

  try{

    const {id}=req.params;


    const {
      name,
      description,
      price,
      stock,
      category,
      image,
    }=req.body;



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
        new:true,
      }
    );



    if(!product){

      return res.status(404).json({
        success:false,
        message:"Product not found",
      });

    }



    res.status(200).json({
      success:true,
      message:"Product updated successfully",
      product,
    });



  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};







// ==========================
// Delete Product
// DELETE /api/products/:id
// ==========================
const deleteProduct = async(req,res)=>{

  try{

    const {id}=req.params;


    const product = await Product.findByIdAndDelete(id);



    if(!product){

      return res.status(404).json({
        success:false,
        message:"Product not found",
      });

    }



    res.status(200).json({
      success:true,
      message:"Product deleted successfully",
    });



  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};






// Export Controllers
module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
