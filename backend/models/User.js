// Import mongoose package
const mongoose = require("mongoose");

// Create User Schema
const userSchema = new mongoose.Schema(
  {
    // User Name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // User Email
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // User Password
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },

    // User Role
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },

    // User Phone Number
    phone: {
      type: String,
      default: "",
    },

    // User Address
    address: {
      type: String,
      default: "",
    },
  },
  {
    // Automatically creates createdAt & updatedAt
    timestamps: true,
  }
);

// Export User Model
module.exports = mongoose.model("User", userSchema);
