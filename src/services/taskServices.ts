import { AxiosError } from 'axios'
import api from '../../src/api/api'
import moment from 'moment'

export async function getTasks(date:string){
    try {

        const response = await api.get(`/task/${date}`)

        const data = response.data

        return data
        
    } catch (err) {

        const error = err as AxiosError

        return error.response?.data
    }
}

export async function createTask(desc:string,estimateAt:Date){

    try {

        const estimate_At = moment(estimateAt).format('YYYY-MM-DD')

        const response = await api.post('/task/',{desc,estimate_At})

        const data = response.data

        return data
   
    } catch (err) {

        const error = err as AxiosError

        return error.response?.data
    }
}

export async function editTask(id:string,desc:string,estimateAt:Date){

    try {

        const estimate_At = moment(estimateAt).format('YYYY-MM-DD')

        const response = await api.put(`/task/${id}`,{desc,estimate_At})

        const data = response.data

        return data
   
    } catch (err) {

        const error = err as AxiosError

        return error.response?.data
    }
}

export async function checkTask(id:string,done_At?:Date){

    try {

        const doneAt = done_At ? moment(done_At).format('YYYY-MM-DD') : undefined

        const response = await api.put(`/task/${id}`,{doneAt})

        const data = response.data

        return data
   
    } catch (err) {

        const error = err as AxiosError

        return error.response?.data
    }
}

export async function deleteTaskService(id:string){

    try {

        const response = await api.delete(`/task/${id}`)

        const data = response.data

        return data
   
    } catch (err) {

        const error = err as AxiosError

        return error.response?.data
    }
}