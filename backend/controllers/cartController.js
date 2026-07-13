// Import Cart Model
const Cart = require("../models/Cart");

// Import Product Model
const Product = require("../models/Product");



// ==========================
// Add Product To Cart
// POST /api/cart
// ==========================
const addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {

      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity: quantity || 1,
          },
        ],
      });

    } else {

      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {

        cart.items[itemIndex].quantity += quantity || 1;

      } else {

        cart.items.push({
          product: productId,
          quantity: quantity || 1,
        });

      }

      await cart.save();
    }

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ==========================
// Get My Cart
// GET /api/cart
// ==========================
const getMyCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty",
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ==========================
// Update Cart Quantity
// PUT /api/cart/:productId
// ==========================
const updateCartQuantity = async (req, res) => {
  try {

    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ==========================
// Remove Item From Cart
// DELETE /api/cart/:productId
// ==========================
const removeFromCart = async (req, res) => {
  try {

    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ==========================
// Clear Cart
// DELETE /api/cart
// ==========================
const clearCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
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
  addToCart,
  getMyCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};
