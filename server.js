// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON
app.use(express.urlencoded({ extended: false })); // Parses form-urlencoded data
app.use(express.static("public")); // Serve static files from /public

// Routes
app.use("/api/items", require("./routes/items"));         // Placeholder route
app.use("/api/payment", require("./routes/payment"));     // Placeholder route
app.use("/api/auth", require("./routes/auth"));           // Auth route for registration/login

// Root test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
