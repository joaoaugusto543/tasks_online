import commonStyles from '../../../commonStyles'
import {StyleSheet, Platform} from 'react-native'

const styles = StyleSheet.create({
    title:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.colors.secondary,
        fontSize:70,
        marginBottom:10
    },
    background:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        marginTop:10,
        backgroundColor:'#fff',
    },
    formContainer:{
        backgroundColor:'rgba(0,0,0,0.8)',
        padding:20,
        width: '90%'
    },
    button:{
        backgroundColor:'#080',
        marginTop:10,
        padding:10,
        alignItems:'center',
        borderRadius: 5
    },
    buttonText:{
        fontFamily:commonStyles.fontFamily,
        color:'#fff',
        fontSize:20
    },
    subtitle:{
        fontFamily:commonStyles.fontFamily,
        color:'#fff',
        fontSize:20,
        textAlign:'center',
        marginBottom:10
    },
    link:{
        marginTop:10
    },
    textLink:{
        color:'#0C0',
        fontSize:15,
        fontWeight:'bold',
        textDecorationLine:'underline'
    },
    buttonSubmit:{
        marginTop:15
    }
})

export default styles