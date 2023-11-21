import { UserDataType } from '../utils/types';
import {GOOGLE_LOGIN, LOGIN} from './constants'

export function login(data:UserDataType){
    return {
        type:LOGIN,
        payload:data
    }
}

export function googleLogin(data:UserDataType){
    return {
        type:GOOGLE_LOGIN,
        payload:data
    }
}