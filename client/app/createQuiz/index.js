import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const CreateQuiz = () => {
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    timeLimit: "",
    questions: [],
  });
  const [open, setOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [items, setItems] = useState([
    { label: "Easy", value: "Easy" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Hard", value: "Hard" },
  ]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    addQuestion();
  }, []);
  const fields = [
    { key: "title", placeholder: "Enter Title", keyboardType: "default" },
    {
      key: "description",
      placeholder: "Enter Description",
      keyboardType: "default",
    },
    { key: "category", placeholder: "Enter Category", keyboardType: "default" },
    {
      key: "timeLimit",
      placeholder: "Enter Time Limit (in minutes)",
      keyboardType: "numeric",
    },
  ];

  const handleInputChange = (key, value) => {
    setQuizDetails((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleDifficultyChange = (value) => {
    handleInputChange("difficulty", value);
  };
  const addQuestion = () => {
    const newQuestion = {
      options: ["", ""],
      correctOption: null,
      isDropdownOpen: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push(""); // Add a new empty option
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1); // Remove the option
    setQuestions(updatedQuestions);
  };

  const toggleDropdown = (qIndex, isOpen) => {
    const updatedQuestions = questions.map((question, index) => ({
      ...question,
      isDropdownOpen: index === qIndex ? isOpen : false,
    }));
    setQuestions(updatedQuestions);
  };

  const submitQuiz = async () => {
    const finalQuiz = { ...quizDetails, questions };
    // Basic validation
    if (!finalQuiz.title || !finalQuiz.description || !finalQuiz.category) {
      Alert.alert("Error", "Please fill all quiz details.");
      return;
    }
    if (finalQuiz.questions.some((q) => !q.question || !q.correctAnswer)) {
      Alert.alert(
        "Error",
        "Please fill all questions and select correct answers."
      );
      return;
    }

    console.log(finalQuiz);
    return;
    Alert.alert("Success", "Quiz created successfully!");
    // Reset form after submission
    setQuizDetails({
      title: "",
      description: "",
      category: "",
      difficulty: "",
      timeLimit: "",
      questions: [],
    });
    setQuestions([]);
    addQuestion(); // Add one empty question
  };

  return (
    <ScrollView className="flex-1 bg-purple-600 pt-12">
      <View className="px-4">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Text className="text-white text-xl">{"<"}</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Create Quiz</Text>
          <View />
        </View>

        {fields.map((field) => (
          <TextInput
            key={field.key}
            className="bg-white mt-4 p-4 rounded-lg text-gray-800 text-lg"
            placeholder={field.placeholder}
            value={quizDetails[field.key]}
            keyboardType={field.keyboardType}
            onChangeText={(value) => handleInputChange(field.key, value)}
          />
        ))}
        <View className="z-10 mt-4">
          <DropDownPicker
            open={open}
            value={difficulty}
            items={items}
            setOpen={setOpen}
            setValue={setDifficulty}
            setItems={setItems}
            onChangeValue={handleDifficultyChange}
            placeholder="Select Difficulty"
            className="z-10 elevation-lg p-4"
          />
        </View>

        {questions.map((question, qIndex) => (
          <View key={qIndex} className="mt-6 bg-white p-4 rounded-lg">
            <TextInput
              value={question.question}
              onChangeText={(value) => handleQuestionChange(qIndex, value)}
              placeholder={`Question ${qIndex + 1}`}
              placeholderTextColor="#B0BEC5"
              className="bg-gray-100 p-3 rounded-lg text-gray-800 mb-4"
            />

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

            <Text className="text-gray-800 font-bold mt-4">
              Correct Answer:
            </Text>
            <DropDownPicker
              open={question.isDropdownOpen}
              value={question.correctAnswer}
              items={question.options.map((opt, index) => ({
                label: opt || `Option ${index + 1}`, // Handle empty options gracefully
                value: index,
              }))}
              setOpen={(isOpen) => toggleDropdown(qIndex, isOpen)} // Pass the index and the new state
              setValue={(callback) => {
                const value =
                  typeof callback === "function"
                    ? callback(question.correctAnswer)
                    : callback;
                handleCorrectAnswerChange(qIndex, value);
              }}
              placeholder="Select Correct Answer"
              containerStyle={{
                marginTop: 8,
                zIndex: 1000 - qIndex, // Ensure dropdowns don't overlap
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
