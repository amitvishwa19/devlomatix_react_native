import { Alert, PermissionsAndroid } from "react-native";
import firebase from '@react-native-firebase/app';
import { appConfig, firebaseConfig } from "./config";
import messaging from '@react-native-firebase/messaging';

export const GetPermissions=()=>{
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
}

export const IntFirebase =async()=>{
    if (firebase.apps.length === 0) {
        const firebaseApp = await  firebase.initializeApp(firebaseConfig)
        if(appConfig.showConsoleLog){
            console.log('Firebase Function : Firebase App Initialized from Firebase Function')
        }
    } else {
        const firebaseApp = await firebase.app()
        if(appConfig.showConsoleLog){
            console.log('Firebase Function : Firebase App is already Initialized from Firebase Function')
        }
    }
}

export const ForegroungFirebaeMsg = ()=>{
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
}

export const FCMDeviceToken=async ()=>{
    const deviceToken = await messaging().getToken()
    return 'device token';
}