import axios, { Axios } from 'axios'
import {Platform} from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:3000/api' : 'http://10.0.2.2:3000/api'

const api = axios.create({
    baseURL:server
}) as Axios


export default api