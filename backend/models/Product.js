// Import mongoose
const mongoose = require("mongoose");


// ==========================
// Product Schema
// ==========================
const productSchema = new mongoose.Schema(

  {

    // Product Name
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },


    // Product Description
    description: {
      type: String,
      required: [true, "Description is required"],
    },


    // Product Price
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },


    // Product Stock
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
    },


    // Product Category Reference
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },


    // Product Image
    image: {
      type: String,
      default: "",
    },

  },


  {
    // Automatically create createdAt and updatedAt
    timestamps: true,
  }

);


// Export Model
module.exports = mongoose.model("Product", productSchema);
