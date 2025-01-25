import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const QuizCard = ({ quiz, onSelect }) => (
  <TouchableOpacity
    className="bg-white p-4 mb-4 rounded-lg"
    onPress={() => onSelect(quiz)}
  >
    <Text className="text-purple-700 text-xl font-semibold">{quiz.title}</Text>
    <Text className="text-gray-600 text-sm">
      {quiz.questions.length} Questions
    </Text>
  </TouchableOpacity>
);

export default QuizCard;
