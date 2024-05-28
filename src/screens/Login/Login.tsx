import React, { Component } from 'react'

import { 
    Text, 
    ImageBackground, 
    View,
    TouchableOpacity 
} from 'react-native'

import image from '../../../assets/imgs/auth.jpg'
import styles from './styles.tsx'
import AuthInput from '../../../src/components/AuthInput/AuthInput.tsx'
import {showError} from '../../services/commomFunctions.ts'
import { signIn } from '../../../src/services/userServices.ts'
import api from '../../../src/api/api.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getUserData from '../../../src/util/getUserData.ts'
import Loader from '../Loader/Loader.tsx'


type MyState = {
    email:string,
    password:string,
    loader:boolean

}

type Props = {
    navigation:any
}

export default class Login extends Component<Props,MyState>{

    state : MyState = {
        email:'lopes@gmail.com',
        password:'12345678',
        loader:true
    }

    verifyAuth = async () => {
        
        this.setState({loader:true})

        const user = await getUserData()

        if(user){
            this.props.navigation.navigate('Home')
            return
        }

        this.setState({loader:false})
    }

    async componentDidMount() {

        this.props.navigation.addListener('focus',async () => {

            this.verifyAuth()
        })
        
        this.verifyAuth()

    }

    signIn = async () => {

        const res = await signIn(this.state)

        if(res.token){

            api.defaults.headers.common['Authorization'] = `bearer ${res.token}`

            AsyncStorage.setItem('token',res.token)
            AsyncStorage.setItem('userData', JSON.stringify(res.user))

            this.props.navigation.navigate('Home')

            return

        }

        showError('Falha no login')

        return

    }

    render (){

       const {email,password,loader} = this.state

       const {navigation} = this.props

       if(loader){
            return <Loader/>
       }

       return (
           <ImageBackground source={image} style={styles.background}>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Acesse sua conta</Text>
                <AuthInput
                    style={styles.input}
                    nameIcon='mail-outline' 
                    placeholder='Digite seu e-mail' 
                    value={email}
                    onChangeText={email => this.setState({email})}
                />
                <AuthInput
                    style={styles.input}
                    nameIcon='lock-closed-outline' 
                    placeholder='Digite sua senha' 
                    value={password}
                    onChangeText={password => this.setState({password})}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.buttonSubmit} onPress={this.signIn}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.textLink}>Não possui conta?</Text>
            </TouchableOpacity>
           </ImageBackground>
       )

    }
}