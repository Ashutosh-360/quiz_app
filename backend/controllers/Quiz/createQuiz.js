const Quiz = require("../../models/Quiz");
const { successHandler } = require("../../utility/successHandler");

const createQuiz = async (req, res, next) => {
  try {
    const { title, description, category, difficulty, timeLimit, questions } = req.body;

    if (!title || !category || !difficulty || !timeLimit || questions?.length <= 0) {
      const error = new Error("Required mandatory parameters");
      error.statusCode = 500;
      next(error);
    }
    const quiz = new Quiz({
      title,
      description,
      category,
      difficulty,
      timeLimit,
      questions,
    });
    const quizData = await quiz.save();
    successHandler(res, quizData);
  } catch (err) {
    next(err);
  }
};

module.exports = { createQuiz };
