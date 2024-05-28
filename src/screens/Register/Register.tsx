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
import { signIn, signUp } from '../../../src/services/userServices.ts'
import showErrorUser from '../../../src/services/showErrorUser.ts'
import api from '../../../src/api/api.ts'


type MyState = {
    name:string,
    email:string,
    password:string,
    profileImage:string,
    confirmPassword:string

}

type Props = {
    navigation:any
}

export default class Register extends Component<Props,MyState>{

    state : MyState = {
        name:'',
        email:'',
        profileImage:'',
        password:'',
        confirmPassword:''
    }

    signUp = async () => {
        
        const resSignUp = await signUp(this.state)
        
        if(resSignUp.message){

            const {email,password} = this.state

            const resSignIn = await signIn({email,password})

            if(resSignIn.token){

                api.defaults.headers.common['Authorization'] = `bearer ${resSignIn.token}`

                this.props.navigation.navigate('Home',resSignIn)

                return

            }

            return

        }

        showErrorUser(resSignUp.error)

        return

    }

    render (){

       const {email,password,name,confirmPassword,profileImage} = this.state

       const {navigation} = this.props

       return (
           <ImageBackground source={image} style={styles.background}>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Crie sua conta</Text>
                <AuthInput
                    nameIcon='link-outline' 
                    placeholder='Digite url da imagem' 
                    value={profileImage}
                    onChangeText={profileImage => this.setState({profileImage})}
                    style={styles.input}
                />
                <AuthInput
                    nameIcon='person-outline' 
                    placeholder='Digite seu nome' 
                    value={name}
                    onChangeText={name => this.setState({name})}
                    style={styles.input}
                />
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
                <AuthInput
                    nameIcon='lock-closed-outline' 
                    placeholder='confirme sua senha' 
                    value={confirmPassword}
                    onChangeText={confirmPassword => this.setState({confirmPassword})}
                    style={styles.input}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.buttonSubmit} onPress={this.signUp}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.textLink}>Já possui conta?</Text>
            </TouchableOpacity>
           </ImageBackground>
       )

    }
}