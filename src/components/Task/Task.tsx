import React, { Component } from 'react'
import { Alert, Text, TouchableWithoutFeedback, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import styles from './styles.tsx'
import Icon from '../Icon/Icon.tsx'
import moment from 'moment'
import 'moment/locale/pt-br'
import checkCompletion from '../../../src/services/checkCompletion.ts'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ModelTask from '../../../src/screens/ModalTask/ModalTask.tsx'
import tasksInterface from 'src/interfaces/tasksInterface.ts'
import addOneDay from '../../../src/services/addOneDay.ts'


type Props = {
    id:string
    desc:string,
    estimateAt:Date,
    doneAt?:Date,
    onToggleTask:(id:string) => void,
    onEditTaskList: (taskUpdated:tasksInterface) => void,
    onDelete:(id:string) => void
}

type MyState = {
    isVisible:boolean
}

export default class Task extends Component<Props,MyState>{

    state: MyState = {
        isVisible:false
    }
    
    getCheckView = (doneAt: Date | undefined,estimateAt: Date) =>{
    
        const checkTask = checkCompletion(doneAt,estimateAt)
    
        if(checkTask === 'concluded'){
            return (
                <View style={styles.concluded}>
                    <Icon type='FontAwesome' name='check-circle' size={30} color='green'/>
                </View>
            )
        }
    
        if(checkTask === 'expired'){
            return (
                <View style={styles.pending}>
                    <Icon type='Ionicons' name='close-circle-outline' size={30} color='red'/>
                </View>
            )
        }
    
        return (
            <View style={styles.pending}>
                <Icon type='Ionicons' name='ellipse-outline' size={30}/>
            </View>
        )
    }
    
    getRightContent = () => {
    
        return (
            <TouchableOpacity style={styles.right} onPress={this.showEditTask}>
                <Icon name='pencil-outline' type='Ionicons' size={30} color='#fff'/>
            </TouchableOpacity>
        )
    
    }

    getLeftContent = () => {
    
        return (
            <View style={styles.left}>
                <Icon name='trash-outline' type='Ionicons' size={20} color='#fff'/>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    
    }

    cancelEditTask = () => {
        this.setState({isVisible:false})
    }

    showEditTask = () =>{
        this.setState({isVisible:true})
    }

    editTask = (taskUpdated:tasksInterface) => {

        if(!taskUpdated.desc || !taskUpdated.desc.trim()){
            Alert.alert('Descrição inválidos','Descrição não informada!')
            return
        }

        //I'm adding one day, because when the client enters the current date, it enters the "if" statement because of the hours. 
        //To solve this, I decided to add one day to the date the client entered, so the hours won't interfere.

        const dateWithDayAdded = addOneDay(taskUpdated.estimateAt)

        if(dateWithDayAdded < new Date()){
            Alert.alert('Data inválida','Data expirada')
            return
        }

        this.props.onEditTaskList(taskUpdated)
        this.setState({isVisible:false})
    }

    render(): React.ReactNode {

        const {id,estimateAt,doneAt,desc,onToggleTask,onDelete} = this.props

        const {isVisible} = this.state

        const task = {
            id,
            estimateAt,
            doneAt,
            desc
        }

        const styleDesc : any[] = [styles.desc]

        let formattedDate = moment(estimateAt).locale('pt-br')
                .format('ddd, D [de] MMMM')

        if(checkCompletion(doneAt,estimateAt) == 'concluded' ){

            formattedDate = moment(doneAt).locale('pt-br')
            .format('ddd, D [de] MMMM') 

            styleDesc.push(styles.line)
        }

        
        return (
            <Swipeable 
                renderRightActions={this.getRightContent} 
                renderLeftActions={this.getLeftContent}
                onSwipeableLeftOpen={() => onDelete(id)}
            >
                {true && <ModelTask isVisible={isVisible} onCancel={this.cancelEditTask} onEdit={this.editTask} task={task}/>}
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => onToggleTask(id)}>
                        <View style={styles.checkContainer}>
                            {this.getCheckView(doneAt,estimateAt)}
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={styleDesc}>{desc}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                </View>
            </Swipeable>
        )
    }

    
}