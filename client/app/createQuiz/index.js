import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", ""], correctAnswer: null, isDropdownOpen: false },
  ]);

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === questionIndex) {
        const updatedOptions = [...q.options];
        updatedOptions[optionIndex] = value;
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, question: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === questionIndex ? { ...q, correctAnswer: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const toggleDropdown = (questionIndex) => {
    const updatedQuestions = questions.map((q, i) => ({
      ...q,
      isDropdownOpen: i === questionIndex ? !q.isDropdownOpen : false,
    }));
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === questionIndex) {
        return { ...q, options: [...q.options, ""] };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const newQuestion = { question: "", options: ["", ""], correctAnswer: null, isDropdownOpen: false };
    setQuestions([...questions, newQuestion]);
  };

  const submitQuiz = async () => {
    if (!title.trim()) {
      return Alert.alert("Error", "Quiz title cannot be empty.");
    }

    if (
      questions.some(
        (q) =>
          !q.question.trim() ||
          q.options.length < 2 ||
          q.options.some((opt) => !opt.trim()) ||
          q.correctAnswer === null
      )
    ) {
      return Alert.alert(
        "Error",
        "Each question must have valid text, at least two options, and a selected correct answer."
      );
    }

    try {
      // Replace with your backend API endpoint
      const response = await axios.post("http://your-api-url.com/api/quizzes", {
        title,
        questions,
      });
      Alert.alert("Success", "Quiz created successfully!");
      setTitle("");
      setQuestions([{ question: "", options: ["", ""], correctAnswer: null, isDropdownOpen: false }]);
    } catch (error) {
      console.error("Error creating quiz:", error);
      Alert.alert("Error", "Failed to create quiz. Please try again.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-purple-600 pt-12">
      <View className="px-4">
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Text className="text-white text-xl">{"<"}</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Create Quiz</Text>
          <View />
        </View>

        {/* Quiz Title */}
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Quiz Title"
          placeholderTextColor="#B0BEC5"
          className="bg-white mt-4 p-4 rounded-lg text-gray-800 text-lg"
        />

        {/* Questions */}
        {questions.map((question, qIndex) => (
          <View key={qIndex} className="mt-6 bg-white p-4 rounded-lg">
            {/* Question Text */}
            <TextInput
              value={question.question}
              onChangeText={(value) => handleQuestionChange(qIndex, value)}
              placeholder={`Question ${qIndex + 1}`}
              placeholderTextColor="#B0BEC5"
              className="bg-gray-100 p-3 rounded-lg text-gray-800 mb-4"
            />

            {/* Options */}
            {question.options.map((option, oIndex) => (
              <View key={oIndex} className="flex-row items-center mb-2">
                <TextInput
                  value={option}
                  onChangeText={(value) =>
                    handleOptionChange(qIndex, oIndex, value)
                  }
                  placeholder={`Option ${oIndex + 1}`}
                  placeholderTextColor="#B0BEC5"
                  className="bg-gray-100 p-3 rounded-lg text-gray-800 flex-1"
                />
                <TouchableOpacity
                  onPress={() => removeOption(qIndex, oIndex)}
                  className="ml-2 bg-red-500 p-3 rounded-full"
                  disabled={question.options.length <= 2} // Disable button if only two options remain
                >
                  <Text className="text-white font-bold">X</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Correct Answer Dropdown */}
            <Text className="text-gray-800 font-bold mt-4">Correct Answer:</Text>
            <DropDownPicker
              open={question.isDropdownOpen}
              value={question.correctAnswer} // Ensure this is the selected value
              items={question.options.map((opt, index) => ({
                label: opt,
                value: index, // Use the option's index as the value
              }))}
              setOpen={() => toggleDropdown(qIndex)} // Toggle dropdown visibility
              setValue={(value) => handleCorrectAnswerChange(qIndex, value)} // Set the correct answer from dropdown
              placeholder="Select Correct Answer"
              containerStyle={{
                marginTop: 8,
                zIndex: 1000 - qIndex, // Adjust zIndex for dropdown stacking
              }}
              style={{
                backgroundColor: "#f0f0f0",
                borderColor: "#ccc",
                borderRadius: 8,
              }}
              dropDownStyle={{
                backgroundColor: "#f0f0f0",
              }}
              textStyle={{ fontSize: 16 }}
            />

            {/* Add Option Button */}
            <TouchableOpacity
              onPress={() => addOption(qIndex)}
              className="mt-4 p-3 bg-purple-500 rounded-full"
            >
              <Text className="text-white text-center font-bold">
                Add Option
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Question Button */}
        <TouchableOpacity
          onPress={addQuestion}
          className="mt-4 p-4 bg-purple-500 rounded-full"
        >
          
          <Text className="text-white text-center font-bold text-lg">
            Add Question
          </Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={submitQuiz}
          className="mt-6 p-4 bg-purple-600 rounded-full"
        >
          <Text className="text-white text-center font-bold text-lg">
            Submit Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateQuiz;
