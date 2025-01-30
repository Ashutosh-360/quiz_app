import { useNavigation } from "../Utilities/Context/NavigationContext";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";


export default function Sidebar(){
  const { navigate } = useNavigation();


    const sidebarData=[{
        redirection_link:"my_profile",label:"My profile"
    },{
        redirection_link:"",label:"Leaderboard"
    },{
        redirection_link:"",label:"Quiz"
    }]
    return(
        <>
        <View className="flex-1 gap-4 text-white p-4">
        {sidebarData.map((elem)=>{
            return(<Text onClick={()=>navigate(elem?.redirection_link)}>
                {elem?.label}
            </Text>)
        })}
        </View>
       
        </>
    )
}