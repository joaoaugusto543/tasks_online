import React from 'react'
import { TextInput, View, ViewStyle } from 'react-native'
import styles from './styles.tsx'
import Icon from '../Icon/Icon.tsx'

type Props = {
    nameIcon:string,
    placeholder:string,
    value:string,
    onChangeText: (item:string) => void,
    secureTextEntry?: boolean,
    style: ViewStyle
}

export default function AuthInput(props:Props){

    return (
        <View style={[styles.container,props.style]}>
            <Icon type='Ionicons' name={props.nameIcon} size={20} style={styles.icon}/>
            <TextInput {...props} style={styles.inputComponent} />
        </View>
    )
}