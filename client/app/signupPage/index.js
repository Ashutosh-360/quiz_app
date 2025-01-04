import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "../../Utilities/Context/NavigationContext";
import axios from "axios";

const SignUp = () => {
  const { navigate } = useNavigation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Submit the form
  const handleSignUp = async () => {
    try {
      console.log("data",formData)
      const response = await axios.post("http://localhost:8000/api/user/signup", formData);
      Alert.alert("Success", response.data.message);
      navigate("Login");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Something went wrong!";
      Alert.alert("Error", errorMessage);
    }
  };

  // JSON Configuration for the fields
  const formFields = [
    { key: "name", placeholder: "Full Name", type: "default" },
    { key: "email", placeholder: "Email", type: "email-address" },
    { key: "password", placeholder: "Password", type: "default", secureTextEntry: true },
  ];

  return (
    <View className="flex-1 bg-purple-700 justify-center px-6">
      <Text className="text-white text-4xl font-bold text-center mb-8">Sign Up</Text>

      {formFields.map((field) => (
        <TextInput
          key={field.key}
          placeholder={field.placeholder}
          placeholderTextColor="#A3A3A3"
          className="bg-white py-3 px-4 rounded-lg mb-4 text-gray-800"
          keyboardType={field.type}
          secureTextEntry={field.secureTextEntry || false}
          onChangeText={(value) => handleInputChange(field.key, value)}
          value={formData[field.key]}
        />
      ))}

      <TouchableOpacity onPress={handleSignUp} className="bg-purple-500 py-4 rounded-lg">
        <Text className="text-center text-white text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate("Login")} className="mt-4">
        <Text className="text-center text-white text-sm">
          Already have an account?{" "}
          <Text className="font-bold underline">Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
