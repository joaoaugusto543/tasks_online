import {Platform, StyleSheet} from 'react-native'
import commonStyles from '../../../commonStyles'

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        flex:3
    },
    taskContainer:{
        flex:7
    },
    titleBar:{
        flex:1,
        justifyContent:'flex-end'
    },
    title:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.colors.secondary,
        fontSize:50,
        marginLeft:20,
        marginBottom:20
    },
    subtitle: {
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.colors.secondary,
        fontSize:20,
        marginLeft:20,
        marginBottom:30
    },
    iconBar:{
        flexDirection:'row',
        marginHorizontal:20,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton:{
        position:'absolute',
        right: 30,
        bottom:30,
        width:50,
        height:50,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    },
    filter:{
        marginBottom:10
    }
    
})

export default styles