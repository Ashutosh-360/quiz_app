import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import QuizDetails from "./quizDetails";

const PAGE_SIZE = 10;

// Simulate backend API data
const totalQuizzes = Array.from({ length: 50 }, (_, i) => ({
  _id: `${i + 1}`,
  title: `Quiz ${i + 1}`,
  questions: [
    {
      text: `Question 1 of Quiz ${i + 1}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctOption: 0,
    },
    {
      text: `Question 2 of Quiz ${i + 1}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctOption: 1,
    },
  ],
}));

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    loadMoreQuizzes(); // Initial load
  }, []);

  const loadMoreQuizzes = () => {
    if (loading) return;
    setLoading(true);

    // Simulate fetching data from backend
    setTimeout(() => {
      const nextPageQuizzes = totalQuizzes.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      );

      setQuizzes((prev) => [...prev, ...nextPageQuizzes]);
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const handleQuizSelect = (quiz) => setSelectedQuiz(quiz);

  const handleQuizSubmit = (answers) => {
    Alert.alert("Quiz Submitted", `Your answers: ${JSON.stringify(answers)}`);
    setSelectedQuiz(null); // Return to quiz list
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View className="py-4">
        <Text className="text-center text-white">Loading more quizzes...</Text>
      </View>
    );
  };

  if (selectedQuiz) {
    return <QuizDetails quiz={selectedQuiz} onSubmit={handleQuizSubmit} />;
  }

  return (
    <View className="flex-1 bg-purple-700 px-4">
      <Text className="text-white text-3xl font-bold text-center my-6">Quiz List</Text>
      <FlatList
        data={quizzes}
        keyExtractor={(quiz) => quiz._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white p-4 mb-4 rounded-lg"
            onPress={() => handleQuizSelect(item)}
          >
            <Text className="text-purple-700 text-xl font-semibold">
              {item.title}
            </Text>
            <Text className="text-gray-600 text-sm">
              {item.questions.length} Questions
            </Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreQuizzes}
        onEndReachedThreshold={0.5}
        //
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default QuizList;
