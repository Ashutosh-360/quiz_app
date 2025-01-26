import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const QuizPagination = ({ currentPage, totalPages, onNext, onPrev }) => (
  <View className="flex-row justify-between mt-4">
    <TouchableOpacity
      className={`${
        currentPage === 1 ? "bg-gray-400" : "bg-purple-500"
      } py-3 px-6 rounded-lg`}
      disabled={currentPage === 1}
      onPress={onPrev}
    >
      <Text className="text-white">Previous</Text>
    </TouchableOpacity>
    <Text className="text-white text-lg">{`Page ${currentPage} of ${totalPages}`}</Text>
    <TouchableOpacity
      className={`${
        currentPage === totalPages ? "bg-gray-400" : "bg-purple-500"
      } py-3 px-6 rounded-lg`}
      disabled={currentPage === totalPages}
      onPress={onNext}
    >
      <Text className="text-white">Next</Text>
    </TouchableOpacity>
  </View>
);

export default QuizPagination;
