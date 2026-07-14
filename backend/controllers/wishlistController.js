// Import User Model
const User = require("../models/User");

// ==========================
// Get Wishlist (populated with product details)
// ==========================
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching wishlist",
    });
  }
};

// ==========================
// Toggle Wishlist (Add if not present, Remove if present)
// ==========================
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    const alreadyExists = user.wishlist.some(
      (id) => id.toString() === productId
    );

    if (alreadyExists) {
      // Remove from wishlist
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId
      );

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Removed from wishlist",
        inWishlist: false,
      });
    } else {
      // Add to wishlist
      user.wishlist.push(productId);

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Added to wishlist",
        inWishlist: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while updating wishlist",
    });
  }
};

// Export
module.exports = {
  getWishlist,
  toggleWishlist,
};