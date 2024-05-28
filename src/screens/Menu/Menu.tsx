import React, { Component } from 'react'
import { Text,Image, TouchableOpacity } from 'react-native'
import styles from './styles.tsx'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import userData from 'src/interfaces/userData.ts'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../Loader/Loader.tsx'
import getUserData from '../../../src/util/getUserData.ts'
import api from '../../../src/api/api.ts'
import Icon from '../../../src/components/Icon/Icon.tsx'

type MyState = {
    user:userData
}

type Props = {
    state:any,
    navigation:any,
    descriptors:any
}

export default class Menu extends Component<Props,MyState>{

    async componentDidMount() {
        
        const user = await getUserData()

        if(!user){
            this.props.navigation.navigate('signIn')
            return
        }

        this.setState({user})

    }

    logout = async () => {

        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userData')

        this.props.navigation.navigate('SignIn')

    } 

    
    render (){
        
        if(!this.state?.user){
            return <Loader/>
        }

        const {email,profileImage,name} = this.state.user

        return (
            <DrawerContentScrollView {...this.props}>
                <SafeAreaView style={styles.userInfo}>
                    <Image 
                        style={styles.profileImage} 
                        source={{uri:profileImage}}
                    />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>
                </SafeAreaView>
                <DrawerItemList {...this.props}/>
                <TouchableOpacity style={styles.logout} onPress={this.logout}>
                    <Text style={styles.logoutText}>Sair</Text>
                    <Icon type='Ionicons' name='log-out-outline' size={25}/>
                </TouchableOpacity>
            </DrawerContentScrollView>
        )
    }
}
