import AsyncStorage from '@react-native-async-storage/async-storage'

async function getUserData(){
    const userString = await AsyncStorage.getItem('userData')

    if(!userString){
        return
    }

    const user = JSON.parse(userString)

    return user
}

export default getUserData