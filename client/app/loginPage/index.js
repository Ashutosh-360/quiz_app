import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "../../Utilities/Context/NavigationContext";

const Login = () => {
  const { navigate } = useNavigation();

  // JSON Configuration for the fields
  const formFields = [
    {
      key: "email",
      placeholder: "Email",
      type: "email-address",
    },
    {
      key: "password",
      placeholder: "Password",
      type: "default",
      secureTextEntry: true,
    },
  ];

  return (
    <View className="flex-1 bg-purple-700 justify-center px-6">
      {/* Title */}
      <Text className="text-white text-4xl font-bold text-center mb-8">Login</Text>

      {/* Map through JSON fields */}
      {formFields.map((field) => (
        <TextInput
          key={field.key}
          placeholder={field.placeholder}
          placeholderTextColor="#A3A3A3"
          className="bg-white py-3 px-4 rounded-lg mb-4 text-gray-800"
          keyboardType={field.type}
          secureTextEntry={field.secureTextEntry || false}
        />
      ))}

      {/* Login Button */}
      <TouchableOpacity className="bg-purple-500 py-4 rounded-lg">
        <Text className="text-center text-white text-lg font-semibold">Login</Text>
      </TouchableOpacity>

      {/* Signup Link */}
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
