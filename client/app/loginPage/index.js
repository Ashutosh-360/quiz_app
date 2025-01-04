import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "../../Utilities/Context/NavigationContext";
import axios from "axios";

const Login = () => {
  const { navigate } = useNavigation();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Submit the form
  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Validation Error", "Both fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/user/login", formData);
      Alert.alert("Success", "Login successful!");
      setLoading(false);
      navigate("Home"); // Adjust navigation as needed
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Invalid email or password!";
      Alert.alert("Error", errorMessage);
      setLoading(false);
    }
  };

  // JSON Configuration for the fields
  const formFields = [
    { key: "email", placeholder: "Email", type: "email-address" },
    { key: "password", placeholder: "Password", type: "default", secureTextEntry: true },
  ];

  return (
    <View className="flex-1 bg-purple-700 justify-center px-6">
      <Text className="text-white text-4xl font-bold text-center mb-8">Login</Text>

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

      <TouchableOpacity
        onPress={handleLogin}
        className={`py-4 rounded-lg ${loading ? "bg-gray-400" : "bg-purple-500"}`}
        disabled={loading}
      >
        <Text className="text-center text-white text-lg font-semibold">
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate("SignUp")} className="mt-4">
        <Text className="text-center text-white text-sm">
          Don't have an account?{" "}
          <Text className="font-bold underline">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
