import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import QuizDetails from "./quizDetails";
import { GetData } from "../../Utilities/API";
import Sidebar from '../../components/sidebar'

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    GetData("api/quizzes", {}, updateQuizzesHandler);
  }, []);

  const updateQuizzesHandler = (response) => {
    console.log(response);
    Alert.alert("Validation Error", response.data.success);

    setQuizzes([...response?.data?.results]);
  };

  const handleQuizSelect = (quiz) => setSelectedQuiz(quiz);

  const handleQuizSubmit = (answers) => {
    setSelectedQuiz(null); // Return to quiz list
  };

  const renderFooter = () => {
    return (
      <View className="py-4">
        <Text className="text-center text-white">Loading more quizzes...</Text>
      </View>
    );
  };

  if (selectedQuiz) {
    return <QuizDetails quiz={selectedQuiz} onSubmit={handleQuizSubmit} />;
  }
  const loadMoreQuizzes = () => {};
  return (
    <View className="flex-1 bg-purple-700 px-4">
      <Sidebar/>
      <Text className="text-white text-3xl font-bold text-center my-6">
        Quiz List
      </Text>
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
        onEndReachedThreshold={0.7}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default QuizList;
