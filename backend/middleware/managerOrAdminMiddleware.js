// ===============================
// Manager or Admin Middleware
// Allows both "manager" and "admin" roles
// ===============================

const managerOrAdmin = (req, res, next) => {

  if (req.user && (req.user.role === "manager" || req.user.role === "admin")) {

    next();

  } else {

    res.status(403).json({
      success: false,
      message: "Access denied. Manager or Admin only",
    });

  }

};

module.exports = managerOrAdmin;
