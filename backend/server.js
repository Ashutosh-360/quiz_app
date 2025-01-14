require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const quizRoutes = require("./routes/quiz");
// const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/user");
//const errorHandler = require('./middlewares/errorHandler');
const cors = require("cors");
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", quizRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    info: err.message || "Something went wrong!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
