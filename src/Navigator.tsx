import 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Login from './screens/Login/Login'
import Register from './screens/Register/Register'
import TaskList from './screens/TaskList/TaskList'
import 'react-native-gesture-handler'
import todayImage from '../assets/imgs/today.jpg'
import tomorrowImage from '../assets/imgs/tomorrow.jpg'
import weekImage from '../assets/imgs/week.jpg'
import monthImage from '../assets/imgs/month.jpg'
import commonStyles from '../commonStyles'
import Menu from './screens/Menu/Menu'
import AsyncStorage from '@react-native-async-storage/async-storage'

const menuConfig = {
    drawerLabelStyle: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
    },
    drawerActiveTintColor: '#080',
    headerShown: false,
}

const Stack = createNativeStackNavigator()

const Drawer = createDrawerNavigator()

 function MainRoutes(){

    const {today,tomorrow,week,month} = commonStyles.colors

    return(  
        <Drawer.Navigator 
        screenOptions={menuConfig} 
        drawerContent={props => <Menu {...props} />}
        >
            <Drawer.Screen name='Today' options={{title:'Hoje'}}>
                    {(props:any) => <TaskList title='Hoje' color={today} daysAhead={0} image={todayImage} {...props}/>}
            </Drawer.Screen>
            <Drawer.Screen name='Tomorrow' options={{title:'Amanhã'}}>
                {(props:any) => <TaskList title='Amanhã' daysAhead={1} color={tomorrow} image={tomorrowImage} {...props}/>}
            </Drawer.Screen>
            <Drawer.Screen name='Week' options={{title:'Semana'}}>
                {(props:any) => <TaskList title='Semana' daysAhead={7} color={week} image={weekImage} {...props}/>}
            </Drawer.Screen>
            <Drawer.Screen name='Month' options={{title:'Mês'}}>
                {(props:any) => <TaskList title='Mês' daysAhead={30} color={month} image={monthImage} {...props}/>}
            </Drawer.Screen>
        </Drawer.Navigator>
    
    )
}


export default function Navigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown:false}}>
                <Stack.Screen name='SignIn'>
                    {(props:any) => <Login {...props}/>}
                </Stack.Screen>
                <Stack.Screen name='SignUp'>
                    {(props:any) => <Register {...props}/>}
                </Stack.Screen>
                <Stack.Screen name='Home' component={MainRoutes}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
