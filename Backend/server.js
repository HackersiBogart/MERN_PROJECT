import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/products.model.js"; // <-- Add this line

dotenv.config();
const app = express();

app.use(express.json()); // allow us to accept JSON data in the req.body

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product || !product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please provide all required fields: name, price, image" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error saving product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port http://localhost:5000");
});
//xraaHH1DxEd43aDm