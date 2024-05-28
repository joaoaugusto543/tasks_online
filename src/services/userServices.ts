import createUserInterface from 'src/interfaces/CreateuserInterface'
import api from '../../src/api/api'
import { AxiosError } from 'axios'

export async function signUp(formData:createUserInterface){

    try {

        const {email,name,password,confirmPassword,profileImage} = formData

        const newUser:createUserInterface = {
            name,
            email,
            password,
            confirmPassword
        }

        if(profileImage){
           newUser.profileImage = profileImage 
        }

        const res = await api.post('/user/signup',newUser)

        const data = res.data

        return data

    } catch (err) {

        const error = err as AxiosError

        const errorData = error.response?.data as {error:string | string[]}

        return errorData

    }

}

type Auth = {
    email:string,
    password:string
}

export async function signIn(auth:Auth){

    try {

        const res = await api.post('/user/signin',auth)

        const data = res.data

        return data

    } catch (err) {

        const error = err as AxiosError

        const errorData = error.response?.data as {error:string}

        return errorData

    }

}