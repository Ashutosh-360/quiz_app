import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "../../Utilities/Context/NavigationContext";

const SignUp = () => {
  const { navigate } = useNavigation();

  // JSON Configuration for the fields
  const formFields = [
    {
      key: "name",
      placeholder: "Full Name",
      type: "default", // Keyboard type
    },
    {
      key: "email",
      placeholder: "Email",
      type: "email-address",
    },
    {
      key: "password",
      placeholder: "Password",
      type: "default",
      secureTextEntry: true, // To hide password input
    },
  ];

  return (
    <View className="flex-1 bg-purple-700 justify-center px-6">
      {/* Title */}
      <Text className="text-white text-4xl font-bold text-center mb-8">Sign Up</Text>

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

      {/* Sign Up Button */}
      <TouchableOpacity className="bg-purple-500 py-4 rounded-lg">
        <Text className="text-center text-white text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>

      {/* Login Link */}
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
