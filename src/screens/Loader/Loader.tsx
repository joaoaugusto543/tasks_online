import React from 'react'
import { ActivityIndicator, SafeAreaView } from 'react-native'
import styles from './styles'

export default function Loader(){
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size={100}/>
        </SafeAreaView>
    )
}