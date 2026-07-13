// ===============================
// Admin Authorization Middleware
// ===============================

const admin = (req, res, next) => {

  // Check user role
  if (req.user && req.user.role === "admin") {

    // Allow admin access
    next();

  } else {

    // Block non-admin users
    res.status(403).json({
      success: false,
      message: "Access denied. Admin only route",
    });

  }

};


// Export Middleware
module.exports = admin;
