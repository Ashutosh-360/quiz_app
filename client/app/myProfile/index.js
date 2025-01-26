import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit'; // Beautiful pie chart
import CountryFlag from 'react-native-country-flag'; // For country flags

const Profile = () => {
  const [activeTab, setActiveTab] = useState('stats');

  const renderContent = () => {
    if (activeTab === 'badges') {
      return (
        <View className="flex-row justify-between mt-8">
          <View className="bg-purple-100 p-5 rounded-lg items-center w-24 shadow-lg">
            <Text className="text-primary-500 text-4xl">⭐</Text>
            <Text className="text-gray-700 mt-2">Star Badge</Text>
          </View>
          <View className="bg-purple-100 p-5 rounded-lg items-center w-24 shadow-lg">
            <Text className="text-primary-500 text-4xl">🎯</Text>
            <Text className="text-gray-700 mt-2">Target Badge</Text>
          </View>
          <View className="bg-purple-100 p-5 rounded-lg items-center w-24 shadow-lg">
            <Text className="text-primary-500 text-4xl">🏆</Text>
            <Text className="text-gray-700 mt-2">Trophy Badge</Text>
          </View>
        </View>
      );
    }

    if (activeTab === 'stats') {
      return (
        <View className="mt-8 items-center">
          <PieChart
            data={[
              { name: 'Completed', population: 75, color: '#6C63FF', legendFontColor: '#7F7F7F', legendFontSize: 15 },
              { name: 'Remaining', population: 25, color: '#E4E4E7', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            ]}
            width={280}
            height={280}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
          <Text className="text-primary-500 text-3xl font-semibold mt-6">37/50</Text>
          <Text className="text-gray-600 mt-2">Quizzes Completed This Month</Text>
        </View>
      );
    }

    if (activeTab === 'details') {
      return (
        <View className="mt-8 px-6">
          <Text className="text-gray-700 text-center">
            🎉 You've played a total of 24 quizzes this month! 🏆
          </Text>
          <Text className="text-gray-700 text-center mt-4">
            💡 Your best category is Math with 90% accuracy.
          </Text>
        </View>
      );
    }
  };

  return (
    <ScrollView className="bg-white">
      {/* Header Section */}
      <View className="bg-gradient-to-r from-purple-400 to-indigo-500 py-12 px-5 rounded-b-3xl shadow-xl">
        <View className="flex-row items-center justify-between">
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Profile picture placeholder
            className="w-28 h-28 rounded-full border-4 border-white shadow-md"
          />
          <View className="ml-6 flex-1">
            <Text className="text-white text-2xl font-bold">Madelyn Dias</Text>
            <Text className="text-white text-sm mt-1">Local Rank: #1,438</Text>
          </View>
          <CountryFlag isoCode="US" size={40} /> {/* Country Flag */}
        </View>
      </View>

      {/* Tab Buttons */}
      <View className="mt-8 flex-row justify-around">
        <TouchableOpacity
          onPress={() => setActiveTab('badges')}
          className={`py-3 px-6 rounded-full ${
            activeTab === 'badges' ? 'bg-purple-500' : 'bg-gray-200'
          }`}
        >
          <Text
            className={`${
              activeTab === 'badges' ? 'text-white' : 'text-gray-800'
            } font-medium text-lg`}
          >
            Badges
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('stats')}
          className={`py-3 px-6 rounded-full ${
            activeTab === 'stats' ? 'bg-purple-500' : 'bg-gray-200'
          }`}
        >
          <Text
            className={`${
              activeTab === 'stats' ? 'text-white' : 'text-gray-800'
            } font-medium text-lg`}
          >
            Stats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('details')}
          className={`py-3 px-6 rounded-full ${
            activeTab === 'details' ? 'bg-purple-500' : 'bg-gray-200'
          }`}
        >
          <Text
            className={`${
              activeTab === 'details' ? 'text-white' : 'text-gray-800'
            } font-medium text-lg`}
          >
            Details
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View className="px-6 mt-8">{renderContent()}</View>
    </ScrollView>
  );
};

export default Profile;
