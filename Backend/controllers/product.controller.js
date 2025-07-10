import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

export const createProduct = async (req, res) => {
  console.log("Received product:", req.body); // ✅ Log the body

  const product = req.body;

  if (!product.name || !product.image || !product.price) {
    console.log("Missing fields:", product);
    return res.status(400).json({ success: false, message: "Please fill all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message); // ✅ Show real error
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};



  export const updateProduct =  async (req, res) => {
    const { id } = req.params;
    const product = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
  
    try {
     const UpdatedProduct =  await Product.findByIdAndUpdate(id, product, {new:true});
     res.status(200).json({ success: true, data: UpdatedProduct });
    } catch (error) {
      console.error("Error updating product:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  export const deleteProduct = async (req, res) => {
    let { id } = req.params;
    id = id.trim(); // Remove whitespace and newlines

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
      }

    console.log("Deleting product with ID:", id);
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.log("Error deleting product:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };