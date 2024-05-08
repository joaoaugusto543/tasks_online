import commonStyles from '../../../commonStyles'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    overlay:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container:{
        backgroundColor:'#fff'
    },
    header:{
        fontFamily: commonStyles.fontFamily,
        backgroundColor:commonStyles.colors.today,
        color:commonStyles.colors.secondary,
        textAlign:'center',
        padding:15,
        fontSize:18
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'flex-end',

    },
    input:{
        fontFamily:commonStyles.fontFamily,
        height: 40,
        margin:15,
        backgroundColor:'#fff',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius:6
    },
    button:{
        margin:20,
        marginRight: 30,
        color:commonStyles.colors.today
    },
    date:{
        fontSize:14,
        marginLeft:15,
        color: commonStyles.colors.today,
        textDecorationLine:'underline'
    }
})

export default styles