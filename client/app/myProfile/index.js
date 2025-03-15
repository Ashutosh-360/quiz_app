import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { PieChart } from 'react-native-chart-kit'; // Beautiful pie chart
import CountryFlag from 'react-native-country-flag'; // For country flags
import {PostData} from '../../Utilities/API'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userDetailsHandler } from '@/redux/Reducers/userSlice';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('stats');
    const [userDetails,setUserDetails]=useState()
    const dispatch=useDispatch()
    useEffect(()=>{
        PostData('api/user/profiles',{},(res)=>{
            console.log(res)
            setUserDetails(res?.data?.profile)
            dispatch(userDetailsHandler(res?.data?.profile))
        })
    },[])

    const renderContent = () => {
        let badges = [{ img: "🎯", text: "Star Badge" },{ img: "🎯", text: "Star Badge" },{ img: "🎯", text: "Star Badge" },{ img: "🎯", text: "Star Badge" },{ img: "🎯", text: "Star Badge" }, { img: "🏆", text: "Target Badge" }, { img: "⭐", text: "Trophy Badge" }];
        if (activeTab === 'badges') {

            return (
                <View className="flex-row flex-wrap justify-center  gap-6 mt-8">
                    {badges.map((elem) => {
                        return (
                            <>
                                <View className="bg-purple-100 p-5 rounded-lg items-center w-24 shadow-lg">
                                    <Text className="text-primary-500 text-4xl">{elem.img}</Text>
                                    <Text className="text-gray-700 mt-2">{elem.text}</Text>
                                </View>
                            </>
                        )
                    })}
                </View>
            );
        }

        if (activeTab === 'stats') {
            return (
                <></>
                // <View className="mt-8 w-[80%] justify-center m-auto items-center">
                //     <PieChart
                //         data={[
                //             { name: 'Completed', population: 75, color: '#6C63FF', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                //             { name: 'Remaining', population: 25, color: '#E4E4E7', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                //         ]}
                //         width={380}
                //         height={280}
                //         chartConfig={{
                //             backgroundColor: '#ffffff',
                //             backgroundGradientFrom: '#ffffff',
                //             backgroundGradientTo: '#ffffff',
                //             decimalPlaces: 0,
                //             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                //             labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                //         }}
                //         accessor="population"
                //         backgroundColor="transparent"
                //         paddingLeft="15"
                //     />
                //     <Text className="text-primary-500 text-3xl font-semibold mt-6">37/50</Text>
                //     <Text className="text-gray-600 mt-2">Quizzes Completed This Month</Text>
                // </View>
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
        <ScrollView className="bg-white p-4">
            {/* Header Section */}
            <View className="bg-gradient-to-r from-purple-400 to-indigo-500 py-12 px-5 rounded-[10px] shadow-xl">
                <View className="flex-col gap-4 items-center justify-between">
                    <Image
                        source={{ uri: 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=' }} // Profile picture placeholder
                        className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                    />
                    <View className="ml-6 flex-1">
                        <Text className="text-white text-2xl text-center font-bold">{userDetails?.username}</Text>
                        <Text className="text-white text-sm mt-1">{userDetails?.email}</Text>
                    </View>
                    <CountryFlag isoCode="US" size={40} /> {/* Country Flag */}
                </View>
            </View>

            {/* Tab Buttons */}
            <View className="mt-8 flex-row justify-around">
                <TouchableOpacity
                    onPress={() => setActiveTab('badges')}
                    className={`py-3 px-6 rounded-full ${activeTab === 'badges' ? 'bg-purple-500' : 'bg-gray-200'
                        }`}
                >
                    <Text
                        className={`${activeTab === 'badges' ? 'text-white' : 'text-gray-800'
                            } font-medium text-lg`}
                    >
                        Badges
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('stats')}
                    className={`py-3 px-6 rounded-full ${activeTab === 'stats' ? 'bg-purple-500' : 'bg-gray-200'
                        }`}
                >
                    <Text
                        className={`${activeTab === 'stats' ? 'text-white' : 'text-gray-800'
                            } font-medium text-lg`}
                    >
                        Stats
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('details')}
                    className={`py-3 px-6 rounded-full ${activeTab === 'details' ? 'bg-purple-500' : 'bg-gray-200'
                        }`}
                >
                    <Text
                        className={`${activeTab === 'details' ? 'text-white' : 'text-gray-800'
                            } font-medium text-lg`}
                    >
                        Details
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Tab Content */}
            <View className="px-6 w-full mt-8">{renderContent()}</View>
        </ScrollView>
    );
};

export default Profile;
