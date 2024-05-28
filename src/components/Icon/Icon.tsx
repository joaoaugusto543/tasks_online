import React, { CSSProperties } from 'react'
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
    style?: CSSProperties
}

export default function Icon({type,name,size,color,style}:Props){
    return (
        <>
            {type == 'Ionicons' && <Ionicons name={name} size={size} color={color} {...style}/>}
            {type == 'FontAwesome' && <FontAwesome name={name} size={size} color={color} {...style}/>}
        </>
    )
}
