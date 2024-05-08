import React from 'react'
import { Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

Ionicons.loadFont()
FontAwesome.loadFont()

type Props = {
    type:'Ionicons' | 'FontAwesome',
    name:string,
    size?:number,
    color?:string

}

export default function Icon({type,name,size,color}:Props){
    return (
        <>
            {type == 'Ionicons' && <Ionicons name={name} size={size} color={color}/>}
            {type == 'FontAwesome' && <FontAwesome name={name} size={size} color={color}/>}
        </>
    )
}
