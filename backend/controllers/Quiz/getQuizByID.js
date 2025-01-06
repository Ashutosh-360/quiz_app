const getQuizById = async (req, res) => {
    try {
      const { id } = req.params;
      const quiz = await Quiz.findById(id);
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.status(200).json(quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      res.status(500).json({ error: 'Failed to fetch quiz' });
    }
  };

  
  module.exports = {getQuizById}