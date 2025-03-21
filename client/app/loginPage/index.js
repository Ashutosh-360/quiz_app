import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "../../Utilities/Context/NavigationContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationTokenHandler,
  userDetailsHandler,
} from "@/redux/Reducers/userSlice";
import Sidebar from "@/components/sidebar";
import { PostData } from "@/Utilities/API";

const Login = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

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
      PostData("api/user/login", formData, (response) => {
        if (!response?.data?.token) {
          Alert.alert("Error", "Login fail!");
          return;
        }
        Alert.alert("Success", "Login successful!");
        setLoading(false);
        dispatch(authenticationTokenHandler(response?.data?.token));
        navigate("quiz_listing");
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Invalid email or password!";
      Alert.alert("Error", errorMessage);
      setLoading(false);
    }
  };

  // JSON Configuration for the fields
  const formFields = [
    { key: "email", placeholder: "Email", type: "email-address" },
    {
      key: "password",
      placeholder: "Password",
      type: "default",
      secureTextEntry: true,
    },
  ];
  return (
    <View className="flex-1 bg-secondary justify-center px-6">
      <Text className="text-white text-4xl font-bold text-center mb-8">
        Login
      </Text>
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
        className={`py-4 bg-primary rounded-lg ${
          loading ? "bg-secondary" : "bg-primary"
        }`}
        disabled={loading}
      >
        <Text className="text-center  text-white text-lg font-semibold">
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
