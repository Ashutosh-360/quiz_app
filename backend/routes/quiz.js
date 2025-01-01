const express = require('express');
const { createQuiz } = require('../controllers/Quiz/createQuiz');

const router = express.Router();

router.post('/create', createQuiz);

module.exports = router;
