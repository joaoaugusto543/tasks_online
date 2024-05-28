import { showError } from './commomFunctions';

export default function showErrorUser(error:string | string[]){

    if(!Array.isArray(error)){

        if(error === 'User already exists'){
            showError('Usuário já cadastrado')
            return
        }else{
            showError('Erro interno')
            return
        }

    }

    let errorString = ''

    if(error.includes('Name is required') || error.includes('Invalid name')){
        errorString += '- Nome é obrigatório!\n\n'
    }

    if(error.includes('Email is required') || error.includes('Invalid email')){
        errorString += '- E-mail inválido!\n\n'
    }

    if(error.includes('Password is required') || error.includes('Invalid password')){
        errorString += '- Senha é obrigatório!\n\n'
    }

    if(error.includes('Different passwords')){
        errorString += '- Senha de confirmação é diferente da senha passada!\n\n'
    }

    if(error.includes('Invalid url')){
        errorString += '- Url inválida!\n\n'
    }

    showError(errorString)

    return

}