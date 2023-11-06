import firebase from '@react-native-firebase/app';
import { useState } from 'react';
import { appConfig, firebaseConfig } from '../utils/config';
import Auth from '@react-native-firebase/auth';

let firebaseApp = null;
let FBUser = null;

export const FirebaseInit = async () => {
    
    if (firebase.apps.length === 0) {
        firebaseApp = await  firebase.initializeApp(firebaseConfig)
        if(appConfig.showConsoleLog){
            console.log('Firebase Function : Firebase App Initialized from Firebase Function')
        }
    } else {
        firebaseApp = await firebase.app()
        if(appConfig.showConsoleLog){
            console.log('Firebase Function : Firebase App is already Initialized from Firebase Function')
        }
    }
    return firebaseApp;
}

export const FirebaseUser = async ()=>{
    FBUser = await Auth().currentUser
    console.log(FBUser)
    return FBUser;
}
