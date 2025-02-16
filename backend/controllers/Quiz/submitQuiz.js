const Quiz = require("../../models/Quiz");
const UserQuiz = require("../../models/UserQuiz");
const { successHandler } = require("../../utility/successHandler");
const jwt = require("jsonwebtoken");

const submitQuiz = async (req, res, next) => {
  try {
    const { quizId, responses } = req.body;
    
    const token = req.header('token')?.replace('Bearer ', ''); 
    if (!token) {
      return next({ statusCode: 401, message: "Authorization token missing" });
    }
    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next({ statusCode: 401, message: "Invalid token" });
    }
    
    const userId = decoded.userId;
    if (!quizId || !responses || Object.keys(responses).length === 0) {
      return next({ statusCode: 400, message: "Required mandatory parameters" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return next({ statusCode: 404, message: "Quiz not found" });
    }

    let score = 0;
    const processedResponses = [];

    quiz.questions.forEach((question, index) => {
      if (responses.hasOwnProperty(index)) {
        const selectedOption = responses[index];
        processedResponses.push({
          questionId: question._id,
          selectedOption,
        });
        if (selectedOption === question.correctOption) {
          score++;
        }
      }
    });

    const userQuiz = new UserQuiz({
      quizId,
      userId,
      responses: processedResponses,
      score,
    });

    const savedUserQuiz = await userQuiz.save();
    successHandler(res, savedUserQuiz);
  } catch (err) {
    next(err);
  }
};

module.exports = { submitQuiz };
