const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctOption: Number,
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  timeLimit: { type: Number, required: true },
  difficulty: { type: Number, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model("Quiz", quizSchema);
