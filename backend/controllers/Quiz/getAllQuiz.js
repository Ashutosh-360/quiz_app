const Quiz = require("../../models/Quiz");
const { successHandler } = require("../../utility/successHandler");

const getAllQuizzes = async (req, res, next) => {
  const { category, difficulty } = req.body;
  const query = {
    ...(category && { category }),
    ...(difficulty && { difficulty }),
  };

  try {
    const quizzes = await Quiz.find(query);
    successHandler(res, quizzes);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllQuizzes };
