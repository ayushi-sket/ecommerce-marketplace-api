// Import JWT package
const jwt = require("jsonwebtoken");

// Import User Model
const User = require("../models/User");


// ===============================
// Protect Routes Middleware
// ===============================
const protect = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.startsWith("Bearer ")) {

      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });

    }


    const token = authHeader.split(" ")[1];


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    req.user = await User.findById(decoded.id)
      .select("-password");


    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: "User not found",
      });

    }


    next();


  } catch (error) {

    console.log(error);


    return res.status(401).json({
      success:false,
      message:"Invalid token",
    });

  }

};




// ===============================
// Admin Middleware
// ===============================
const admin = (req,res,next)=>{


  if(!req.user){

    return res.status(401).json({
      success:false,
      message:"User not logged in",
    });

  }



  if(req.user.role !== "admin"){

    return res.status(403).json({
      success:false,
      message:"Access denied. Admin only",
    });

  }



  next();

};



// Export
module.exports = {
  protect,
  admin,
};
