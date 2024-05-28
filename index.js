/**
 * @format
 */

import {AppRegistry} from 'react-native'
import TaskList from './src/screens/TaskList/TaskList'
import {name as appName} from './app.json'
import Login from './src/screens/Login/Login'
import Register from './src/screens/Register/Register'
import Navigator from './src/Navigator'


AppRegistry.registerComponent(appName, () => Navigator)
