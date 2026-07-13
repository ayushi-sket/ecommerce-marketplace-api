const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// ===============================
// Dashboard
// ===============================
const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    let totalRevenue = 0;

    orders.forEach((order) => {
      totalRevenue += order.totalAmount;
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
