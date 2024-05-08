import React, { Component } from 'react'
import { Text,View,ImageBackground, FlatList , TouchableOpacity, Alert} from 'react-native'
import styles from './styles.tsx'
import todayImage from '../../../assets/imgs/today.jpg'
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


type MyState = {
    showDoneTasks:boolean
    visibleTasks: tasksInterface[]
    tasks: tasksInterface[],
    showAddTask:boolean
}

export default class TaskList extends Component<any,MyState>{

    
    state : MyState = {
        showDoneTasks:true,
        visibleTasks:[],
        showAddTask:false,
        tasks:[
            {
                id:String(Math.random()),
                desc:'Comprar banana',
                estimateAt:new Date(2024,3,25)
            },
            {
                id:String(Math.random()),
                desc:'Comprar batata',
                estimateAt:new Date(2024,4,24)
            },
            {
                id:String(Math.random()),
                desc:'Comprar limão',
                estimateAt:new Date(2024,6,27),
                doneAt: new Date(2024,6,24)
            }
        ]
        
    }

    componentDidMount(): void {
        this.filterTasks()
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

    }

    toggleTask = (id:string) => {

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
            'Editar tarefa: arraste a tarefa para a esquerda "<-" e aperte no lápis e modifique a tarefa.',
            'Excluir tarefa: arraste a tarefa para a direita "<-" para excluir a tarefa(arraste pelo menos até a metade).'
        ]

        const instructions = `${instructionsArray[0]}\n\n${instructionsArray[1]}\n\n${instructionsArray[2]}`

        Alert.alert('Instruções', instructions.trim())
    }

    addTask = (newTask:addTaskInterface) => {

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

        const tasks:tasksInterface[] = [...this.state.tasks]

        const upcomingTask = {
            ...newTask,
            id:String(Math.random()),
            doneAt:undefined
        }

        tasks.push(upcomingTask)

        this.setState({tasks,showAddTask:false},this.filterTasks)
    }

    editTaskList = (taskUpdated:tasksInterface) => {

        const tasks:tasksInterface[] = [...this.state.tasks]

        const taksUpdated = tasks.map((task)=>{
            if(task.id === taskUpdated.id){
                return taskUpdated
            }

            return task
        })

        this.setState({tasks:taksUpdated,showAddTask:false},this.filterTasks)
    }

    deleteTask = (id:string) => {

        const tasks = [...this.state.tasks]

        const tasksFiltered = tasks.filter((task)=> task.id !== id)

        this.setState({tasks:tasksFiltered},this.filterTasks)

    }

    render(): React.ReactNode {
        
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        
        const {showDoneTasks,visibleTasks,showAddTask} = this.state

        return (
            <GestureHandlerRootView>

                <View style={styles.container}>
                    <ModelTask 
                     onSave={this.addTask}
                     isVisible={showAddTask} 
                     onCancel={this.cancelAddTask} 
                    />
                    <ImageBackground source={todayImage} style={styles.background}>
                        <View style={styles.iconBar}>

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

                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon 
                                    name={showDoneTasks ? 'eye-outline' : 'eye-off-outline'} 
                                    type='Ionicons'
                                    size={20}
                                    color={commonStyles.colors.secondary}
                                /> 
                            </TouchableOpacity>

                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>Hoje</Text>
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
                        style={styles.addButton}
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