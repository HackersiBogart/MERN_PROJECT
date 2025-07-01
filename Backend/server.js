import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products.route.js";
import mongoose from "mongoose";
import Product from "./models/product.model.js";

dotenv.config();
const app = express();

const PORT= process.env.PORT || 5000;

app.use(express.json()); // allow us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port http://localhost:5000" + PORT);
});
//xraaHH1DxEd43aDm