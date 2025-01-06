const deleteQuiz = async (req, res) => {
    try {
      const { id } = req.params;
  
      
      const deletedQuiz = await Quiz.findByIdAndDelete(id);
  
      if (!deletedQuiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.status(200).json({ message: 'Quiz deleted successfully', quiz: deletedQuiz });
    } catch (error) {
      console.error('Error deleting quiz:', error);
      res.status(500).json({ error: 'Failed to delete quiz' });
    }
  };
  
  module.exports ={deleteQuiz}