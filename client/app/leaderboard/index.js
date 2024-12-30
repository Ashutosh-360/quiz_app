import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

const Leaderboard = () => {
  const data = [
    {
      id: 1,
      name: "Davis Curtis",
      points: 2569,
      flag: "🇵🇹",
      crown: "gold",
    },
    {
      id: 2,
      name: "Alena Donin",
      points: 1469,
      flag: "🇫🇷",
      crown: "silver",
    },
    {
      id: 3,
      name: "Craig Gouse",
      points: 1053,
      flag: "🇨🇦",
      crown: "bronze",
    },
    {
      id: 4,
      name: "Madelyn Dias",
      points: 590,
      flag: "🇮🇳",
      crown: null,
    },
    {
      id: 5,
      name: "Zain Vaccaro",
      points: 448,
      flag: "🇮🇹",
      crown: null,
    },
    {
      id: 6,
      name: "Skylar Geidt",
      points: 448,
      flag: "🇺🇸",
      crown: null,
    },
  ];

  return (
    <View className="flex-1 bg-purple-600 pt-12">
      <View className="px-4">
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Text className="text-white text-xl">{"<"}</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Leaderboard</Text>
          <View />
        </View>

        {/* Tabs */}
        <View className="flex-row justify-around mt-4 bg-purple-500 rounded-full">
          <TouchableOpacity className="px-6 py-2 bg-white rounded-full">
            <Text className="text-purple-600 font-semibold">Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-2">
            <Text className="text-white">All Time</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Leaderboard */}
      <ScrollView className="mt-6 bg-white flex-1 rounded-t-3xl p-4">
        {data.map((user, index) => (
          <View
            key={user.id}
            className="flex-row items-center justify-between py-4 border-b border-gray-200"
          >
            {/* Rank & Avatar */}
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-gray-700 mr-4">
                {index + 1}
              </Text>
              <View className="h-12 w-12 bg-gray-300 rounded-full justify-center items-center">
                <Text className="text-lg">{user.flag}</Text>
              </View>
            </View>

            {/* Name & Points */}
            <View className="flex-1 ml-4">
              <Text className="text-gray-800 font-medium">{user.name}</Text>
              <Text className="text-gray-500">{user.points} points</Text>
            </View>

            {/* Crown */}
            {user.crown && (
              <View
                className={`h-8 w-8 ${
                  user.crown === "gold"
                    ? "bg-yellow-400"
                    : user.crown === "silver"
                    ? "bg-gray-400"
                    : "bg-orange-400"
                } rounded-full justify-center items-center`}
              >
                <Text className="text-white font-bold">{"👑"}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Leaderboard;
