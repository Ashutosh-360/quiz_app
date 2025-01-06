require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quiz');
// const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
//const errorHandler = require('./middlewares/errorHandler');
const cors = require("cors");
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/quiz', quizRoutes);
//app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get("/",(req,res)=>{
  res.send("hey");

})

// Error Handler
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
