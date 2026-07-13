// Import mongoose
const mongoose = require("mongoose");


// Create Cart Schema
const cartSchema = new mongoose.Schema(
  {

    // User who owns this cart
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    // Products in cart
    items: [
      {
        // Product reference
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },


        // Product quantity
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      }
    ],

  },
  {
    timestamps: true,
  }
);


// Export Model
module.exports = mongoose.model("Cart", cartSchema);
