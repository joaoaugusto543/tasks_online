import React, { Component, useEffect } from 'react'
import { Text,View,ImageBackground, FlatList , TouchableOpacity, Alert, ImageSourcePropType} from 'react-native'
import styles from './styles.tsx'
import moment from 'moment'
import 'moment/locale/pt-br'
import Task from '../../components/Task/Task.tsx'
import tasksInterface from 'src/interfaces/tasksInterface.ts'
import checkCompletion from '../../../src/services/checkCompletion.ts'
import Icon from '../../components/Icon/Icon.tsx'
import commonStyles from '../../../commonStyles.ts'
import ModelTask from '../ModalTask/ModalTask.tsx'
import addTaskInterface from 'src/interfaces/addTaskInterface.ts'
import addOneDay from '../../../src/services/addOneDay.ts'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AsyncStorage from  '@react-native-async-storage/async-storage'
import { checkTask, createTask, deleteTaskService, editTask, getTasks } from '../../../src/services/taskServices.ts'
import { showError } from '../../../src/services/commomFunctions.ts'
import Loader from '../Loader/Loader.tsx'
import api from '../../../src/api/api.ts'


type MyState = {
    showDoneTasks:boolean
    visibleTasks: tasksInterface[]
    tasks: tasksInterface[],
    showAddTask:boolean,
    loader:boolean
}

type Props = {
    navigation:any,
    title:string,
    daysAhead:number,
    color:string,
    image:ImageSourcePropType
}


const initialState = {
    showDoneTasks:true,
    visibleTasks:[],
    showAddTask:false,
    tasks:[],
    loader:true
}

export default class TaskList extends Component<Props,MyState>{

    
    state : MyState = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState') as string

        const token = await AsyncStorage.getItem('token')

        const savedState:MyState = JSON.parse(stateString) || initialState

        api.defaults.headers.common['Authorization'] = `bearer ${token}`

        this.props.navigation.addListener('focus', () => {
            this.loadData()
        })


        this.setState({

            showDoneTasks:savedState.showDoneTasks

        },this.filterTasks)

        this.loadData()
    }

    loadData = async () => {

        this.setState({loader:true})

        const currentDate = moment().add({days:this.props.daysAhead}).format('YYYY-MM-DD')

        const res = await getTasks(currentDate)

        if(res.error){
            showError('Erro interno')
            return
        }

        this.setState({tasks:res,loader:false},this.filterTasks)

    }

    toggleFilter = () => {
        this.setState({showDoneTasks:!this.state.showDoneTasks},this.filterTasks)
    }

    filterTasks = () => {

        let visibleTasks:tasksInterface[] = []

        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else{

            // filtering completed and expired tasks

            const tasksFiltered = this.state.tasks.filter((task) => {

                if(checkCompletion(task.doneAt,task.estimateAt) === 'pending'){
                    return true
                }

                return false

            })

            visibleTasks = [...tasksFiltered]
        }

        this.setState({visibleTasks})

        AsyncStorage.setItem('tasksState', JSON.stringify({showDoneTasks:this.state.showDoneTasks}))

    }

    toggleTask = async (id:string) => {

        const task = this.state.tasks.find(task => task.id === id)

        if(!task){
            return
        }

        const tasks = [...this.state.tasks]

        const check = checkCompletion(task?.doneAt,task.estimateAt)

        if(check === 'expired'){
            return
        }

        tasks.forEach((taskItem)=>{

            if(task.id !== taskItem.id){
                return
            }

            task.doneAt = check == 'pending' ? new Date() : undefined
            
        })

        if(task.doneAt){
            await checkTask(task.id,task.doneAt)
        }else{
            await checkTask(task.id)
        }

        this.setState({tasks},this.filterTasks)

    }

    cancelAddTask = () =>{
        this.setState({showAddTask:false})
    }

    showAddTask = () => {
        this.setState({showAddTask:true})
    }

    showInstructions = () =>{
        
        const instructionsArray = [
            'Adicionar tarefas: aperte no botão "+" e escreva a descrição da tarefa, clique na data e adicione a data para a tarefa ser concluída.',
            'Editar tarefa: arraste a tarefa para a esquerda "<----" e aperte no lápis e modifique a tarefa.',
            'Excluir tarefa: arraste a tarefa para a direita "---->" para excluir a tarefa(arraste pelo menos até a metade).'
        ]

        const instructions = `${instructionsArray[0]}\n\n${instructionsArray[1]}\n\n${instructionsArray[2]}`

        Alert.alert('Instruções', instructions.trim())
    }

    addTask = async (newTask:addTaskInterface) => {

        this.setState({loader:true})

        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Descrição inválidos','Descrição não informada!')
            return
        }

        //I'm adding one day, because when the client enters the current date, it enters the "if" statement because of the hours. 
        //To solve this, I decided to add one day to the date the client entered, so the hours won't interfere.

        const dateWithDayAdded = addOneDay(newTask.estimateAt)

        if(dateWithDayAdded < new Date()){
            Alert.alert('Data inválida','Data expirada')
            return
        }

        const res = await createTask(newTask.desc,newTask.estimateAt)

        if(res.error){
            showError('Erro interno')
            return
        }

        this.setState({showAddTask:false},this.loadData)
    }

    editTaskList = async (taskUpdated:tasksInterface) => {

        this.setState({loader:true})

        const tasks:tasksInterface[] = [...this.state.tasks]

        const taksUpdated = tasks.map((task)=>{
            if(task.id === taskUpdated.id){

                return taskUpdated
            }

            return task
        })

        const {id,desc,estimateAt} = taskUpdated

        await editTask(id,desc,estimateAt)

        this.setState({tasks:taksUpdated},this.loadData)
    }

    deleteTask = async (id:string) => {

        this.setState({loader:true})

        const tasks = [...this.state.tasks]

        const tasksFiltered = tasks.filter((task)=> task.id !== id)

        await deleteTaskService(id)

        this.setState({tasks:tasksFiltered},this.loadData)

    }
    
    render(): React.ReactNode {
        
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        
        const {showDoneTasks,visibleTasks,showAddTask,loader} = this.state

        const {title,navigation,image,color} = this.props

        if(loader){
            return <Loader/>
        }

        return (

            <GestureHandlerRootView>
                <View style={styles.container}>
                    {!loader &&
                        <ModelTask 
                            onSave={this.addTask}
                            isVisible={showAddTask} 
                            onCancel={this.cancelAddTask} 
                        />
                    
                    }
                    <ImageBackground source={image} style={styles.background}>
                        <View style={styles.iconBar}>
                                <TouchableOpacity 
                                    onPress={() => navigation.toggleDrawer()}
                                    activeOpacity={0.7}
                                >
                                    <Icon 
                                        name='menu' 
                                        size={25} 
                                        type='Ionicons'
                                        color={commonStyles.colors.secondary}
                                    />
                                </TouchableOpacity>
                            <View>    
                                <TouchableOpacity style={styles.filter} onPress={this.toggleFilter}>
                                    <Icon 
                                        name={showDoneTasks ? 'eye-outline' : 'eye-off-outline'} 
                                        type='Ionicons'
                                        size={20}
                                        color={commonStyles.colors.secondary}
                                    /> 
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={this.showInstructions}
                                    activeOpacity={0.7}
                                >
                                    <Icon 
                                        name='help-outline' 
                                        size={20} 
                                        type='Ionicons'
                                        color={commonStyles.colors.secondary}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.subtitle}>{today}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.taskContainer}>
                        <FlatList
                            data={visibleTasks}
                            keyExtractor= { item => item.id}
                            renderItem={({item}) => <Task 
                                                        {...item} 
                                                        onDelete={this.deleteTask}
                                                        onToggleTask={this.toggleTask} 
                                                        onEditTaskList={this.editTaskList}
                                                    />
                            }
                        />
                    </View>
                    <TouchableOpacity 
                        style={[styles.addButton,{backgroundColor:color}]}
                        onPress={this.showAddTask}
                        activeOpacity={0.7}
                    >
                        <Icon 
                            name='add-outline' 
                            size={25} 
                            type='Ionicons'
                            color={commonStyles.colors.secondary}
                        />
                    </TouchableOpacity>
                </View>
            </GestureHandlerRootView>

       )
    }
}