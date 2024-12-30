import { Text, View } from "react-native";
import "../global.css";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View className="text-2xl font-semibold flex justify-center items-center flex-1">
      <Text className="font-semibold">Edit </Text>
      <Link href="/leaderboard">Go</Link>
    </View>
  );
}
