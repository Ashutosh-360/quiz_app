const express = require("express");
const { createQuiz } = require("../controllers/Quiz/createQuiz");
const { getAllQuizzes } = require("../controllers/Quiz/getAllQuiz.js");
const { getQuizById } = require("../controllers/Quiz/getQuizByID");
const { updateQuiz } = require("../controllers/Quiz/updateQuiz");
const { deleteQuiz } = require("../controllers/Quiz/deleteQuiz");
const { submitQuiz } = require("../controllers/Quiz/submitQuiz");

const router = express.Router();
router.post("/create_quiz", createQuiz);
router.get("/quizzes", getAllQuizzes);
router.get("/quizzes/:id", getQuizById);
router.put("/quizzes/:id", updateQuiz);
router.delete("/quizzes/:id", deleteQuiz);
router.post("/submit_quiz",submitQuiz)

module.exports = router;
