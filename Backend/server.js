import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // ✅ You missed this
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products.route.js";

dotenv.config(); // ✅ Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json()); // Required for req.body to work
app.use(cors());

// ✅ Routes
app.use("/api/products", productRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});
