// Import User Model
const User = require("../models/User");

// Import bcrypt for password hashing
const bcrypt = require("bcryptjs");

// Import JWT package
const jwt = require("jsonwebtoken");


// ==========================================
// Register User
// POST : /api/auth/register
// ==========================================
const registerUser = async (req, res) => {
  try {

    // Get user data from request body
    const {
      name,
      email,
      password,
      role,
      phone,
      address,
    } = req.body;


    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }


    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }


    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }


    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "customer", // Default role
      phone,
      address,
    });


    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


    // Success Response
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


// ==========================================
// Login User
// POST : /api/auth/login
// ==========================================
const loginUser = async (req, res) => {

  try {

    // Get email and password
    const { email, password } = req.body;


    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }


    // Find user by email
    const user = await User.findOne({ email });


    // Check user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // Compare entered password with database password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );


    // Invalid password
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }


    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


    // Success Response
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};


// ==========================================
// Export Controllers
// ==========================================
module.exports = {
  registerUser,
  loginUser,
};
