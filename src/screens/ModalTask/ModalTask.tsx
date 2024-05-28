import React, { Component } from 'react'

import { 
    Platform,
    Modal, 
    View, 
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity,
    TextInput,
    Alert

} from 'react-native'

import moment from 'moment'

import DateTimePicker from '@react-native-community/datetimepicker'

import styles from './styles.tsx'
import addTaskInterface from 'src/interfaces/addTaskInterface.ts'
import tasksInterface from 'src/interfaces/tasksInterface.ts'
import Loader from '../Loader/Loader.tsx'

type Props = {
    onCancel: () => void,
    onSave?: (newTask:addTaskInterface) => void,
    onEdit?: (taskUpdated:tasksInterface) => void, 
    isVisible:boolean,
    task?:tasksInterface
}

type MyState = {
    desc:string,
    date: Date,
    showDatePicker:boolean
}

const initialState = {desc:'', date: new Date(), showDatePicker:false}

export default class ModelTask extends Component<Props,MyState>{

    state: MyState = {
         ...initialState,
    }

    componentDidMount(): void {

        const task = this.props.task
        
        if(task){
            this.setState({desc:task.desc,date:new Date(task.estimateAt)})
        }

    }

    showDatePicker = () => {
        this.setState({showDatePicker:true})
    }

    saveAddTask = () => {

        const newTask={
            desc:this.state.desc,
            estimateAt: this.state.date
        }

        if(this.props.onSave){
            this.props.onSave(newTask)
        }

        this.setState({...initialState})

    }

    closeTaskEdiAndReset = () => {

        const task = this.props.task

        if(!task){
            Alert.alert('Tarefa inválida', 'A tarefa passada é inválida')
            return
        }

        this.props.onCancel()
        this.setState({desc:task.desc,date:new Date(task.estimateAt)})
    }

    saveEditTask = () => {

        const task = this.props.task

        if(!task){
            Alert.alert('Tarefa inválida', 'A tarefa passada é inválida')
            return
        }

        const taskUpdated={
            id:String(this.props.task?.id),
            desc:this.state.desc,
            estimateAt:this.state.date,
            doneAt:undefined
        }

        if(this.props.onEdit){
            this.props.onEdit(taskUpdated)
            return
        }

        this.setState({desc:task.desc,date:new Date(task.estimateAt)})

    }

    getDatePicker = () => {

        let datePiker = <DateTimePicker 
                            value={this.state.date}
                            mode='date'
                            onChange={(_event,date:Date | undefined) =>{

                                if(!date){
                                    return
                                }

                                this.setState({date,showDatePicker:false})
                            }}
                        
                        />
        
        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android'){
            datePiker = (
                <View>
                    <TouchableOpacity onPress={this.showDatePicker}>
                        <Text style={styles.date}>{dateString}</Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePiker}
                </View>
            )
        }

        return datePiker

    }
    
    render (){

        const {isVisible,onCancel,task} = this.props
        
        const {desc} = this.state

       return (
    
            <Modal 
                transparent={true} 
                visible={isVisible}
                onRequestClose={onCancel}
                animationType='fade'
            >
                <TouchableWithoutFeedback
                    onPress={task ? this.closeTaskEdiAndReset: onCancel}>
                    <View style={styles.overlay}/>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Informe a descrição'
                        value={desc}
                        onChangeText={desc => this.setState({desc})}
                    />
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={task ? this.closeTaskEdiAndReset: onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={!task ? this.saveAddTask : this.saveEditTask}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={task ? this.closeTaskEdiAndReset: onCancel}>
                    <View style={styles.overlay}/>
                </TouchableWithoutFeedback>
            </Modal>
       )
    }
}