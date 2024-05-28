import commonStyles from '../../../commonStyles'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    header:{
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    avatar:{
        width: 60,
        height: 60
    },
    userInfo:{
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    profileImage:{
        borderRadius:35,
        width:70,
        height:70
    },
    name:{
        fontWeight:'bold',
        fontSize:16,
        marginVertical:3,
        fontFamily:commonStyles.fontFamily
    },
    email:{
        fontStyle:'italic',
        fontFamily:commonStyles.fontFamily
    },
    logout:{
        padding:20,
        flexDirection:'row',
        alignItems:'center'
    },
    logoutText:{
        fontFamily:commonStyles.fontFamily,
        fontSize:20,
        marginRight:5
    }
})

export default styles