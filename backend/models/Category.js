const mongoose = require("mongoose");

// Create Category Schema
const categorySchema = new mongoose.Schema(
  {
    // Category name
    name: {
      type: String,      // Data type is String
      required: true,    // Name is mandatory
      unique: true,      // Duplicate category names are not allowed
      trim: true,        // Removes extra spaces
    },
  },
  {
    timestamps: true,    // Automatically adds createdAt and updatedAt
  }
);

// Export Category Model
module.exports = mongoose.model("Category", categorySchema);
