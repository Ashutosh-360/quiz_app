const Quiz = require("../../models/Quiz");

const createQuiz = async (req, res, next) => {
  try {
    const { title, description, category, difficulty, timeLimit, questions } =
      req.body;

    if (
      !title ||
      !category ||
      !difficulty ||
      !timeLimit ||
      questions?.length <= 0
    ) {
      res.status(200).json("quiz");
      return;
    }
    const quiz = new Quiz({
      title,
      description,
      category,
      difficulty,
      timeLimit,
      questions,
    });
    await quiz.save();
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

module.exports = { createQuiz };
