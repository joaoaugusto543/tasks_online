import {StyleSheet} from 'react-native'
import commonStyles from '../../../commonStyles'

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth:1,
        alignItems:'center',
        paddingVertical:10,
        backgroundColor:'#fff'
    },
    checkContainer:{
        width: "20%",
    },
    concluded:{
        alignItems:'center'
    },
    pending:{
        alignItems:'center'
    },
    desc:{
        fontFamily: commonStyles.fontFamily,
        color:commonStyles.colors.mainText,
        fontSize: 15
    },
    line:{
        textDecorationLine:'line-through'
    },
    date:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.colors.subText,
        fontSize:12
    },
    right:{
        flex:1,
        backgroundColor:'orange',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20
    },
    left:{
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:5,
        flex:1
    },
    excludeText:{
        fontFamily:commonStyles.fontFamily,
        color:'#fff',
        fontSize:15,
        margin:10,
        marginLeft:5,
        fontWeight:'bold'
    }

})

export default styles