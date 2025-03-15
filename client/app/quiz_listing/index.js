import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import QuizDetails from "./quizDetails";
import { GetData, PostData } from "../../Utilities/API";

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
    setQuizzes([...response?.data?.results]);
  };

  const handleQuizSelect = (quiz) => setSelectedQuiz(quiz);

  const handleQuizSubmit = (answers) => {

    console.log("answers submit",answers,selectedQuiz)
    

    let payload = {
      responses: answers,
      quizId: selectedQuiz?._id,
    };
    PostData("api/submit_quiz", payload, (res) => {
      console.log("submit response", res);
    });

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
    <View className="bg-white rounded-lg p-4">
      {/* <Sidebar /> */}
      <View className="w-full justify-between flex flex-row py-4">
        <Text className=" text-[20px] font-bold text-center">Live Quizzes</Text>
        <Text className="text-[14px]">See All</Text>
      </View>
      <FlatList
        data={quizzes}
        keyExtractor={(quiz) => quiz._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white p-4 mb-4 rounded-2xl border border-gray-200"
            onPress={() => handleQuizSelect(item)}
          >
            <Text className="text-xl font-semibold">
              {item.title}
            </Text>
            <Text className="text-gray-500 text-sm">
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
