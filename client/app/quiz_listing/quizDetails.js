import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";

const QuizDetails = ({ quiz, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };
  useEffect(()=>{
    console.log(answers,"anser")
  },[answers])

  const handleQuizSubmit = () => {
    console.log(answers,quiz,Object.keys(answers).length != quiz.questions.length)
    if (Object.keys(answers).length != quiz.questions.length) {
      Alert.alert("Incomplete", "Please answer all the questions.");
      return;
    }
    onSubmit(answers);
  };

  return (
    <View className="flex-1 bg-purple-700 px-4 py-6">
      <Text className="text-white text-3xl font-bold text-center mb-6">{quiz.title}</Text>
      <FlatList
        data={quiz.questions}
        keyExtractor={(item, index) => `${quiz._id}-${index}`}
        renderItem={({ item, index }) => (
          <View className="bg-white p-4 mb-4 rounded-lg">
            <Text className="text-purple-700 font-semibold">
              {index + 1}. {item.text}
            </Text>
            {item.options.map((option, i) => (
              <TouchableOpacity
                key={i}
                className={`mt-2 py-2 px-3 rounded-lg ${
                  answers[index] === i ? "bg-purple-300" : "bg-gray-100"
                }`}
                onPress={() => handleAnswerSelect(index, i)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      <TouchableOpacity
        className="bg-purple-500 py-4 rounded-lg mt-4"
        onPress={handleQuizSubmit}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Submit Quiz
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizDetails;
