import { ActivityIndicator, Modal, View,Text } from "react-native-web";


const TestingComponent = ()=> {
    return (
        <>
            <ActivityIndicator size="large" color="#00eeff" />
            <Modal visible={true} transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>This is a modal!</Text>
                </View>
            </Modal>
        </>
    )
}

export default TestingComponent