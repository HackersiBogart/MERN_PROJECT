import express from "express";

import dotenv from "dotenv"; // ✅ You missed this
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products.route.js";
import path from "path";

dotenv.config(); // ✅ Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); // ✅ Get the current directory

// ✅ Middleware
app.use(express.json()); // Required for req.body to work

// ✅ Routes  
app.use("/api/products", productRoutes);
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist"))); // Serve static files from the React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html")); // Serve the React app for all other routes
  });
}



// ✅ Start Server
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});
