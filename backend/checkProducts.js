const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("📂 Collections found:", collections.map(c => c.name));

    const products = await db.collection("products").find({}).toArray();
    console.log("🛒 Products count:", products.length);
    console.log(products);

    process.exit();
  })
  .catch((err) => {
    console.error("❌ Connection Error:", err);
    process.exit(1);
  });
  