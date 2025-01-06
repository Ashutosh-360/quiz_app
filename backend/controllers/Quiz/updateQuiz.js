const updateQuiz = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, questions } = req.body;
  
      
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        id,
        { title, questions },
        { new: true, runValidators: true }
      );
  
      if (!updatedQuiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.status(200).json(updatedQuiz);
    } catch (error) {
      console.error('Error updating quiz:', error);
      res.status(500).json({ error: 'Failed to update quiz' });
    }
  };

  module.exports ={updateQuiz}
  