import { Alert } from 'react-native'

function showError(err:string) {

    Alert.alert('Ocorreu um Problema!', err)

}

function showSuccess(msg:string){
    Alert.alert('Sucesso', msg)
}

export {showError,showSuccess}