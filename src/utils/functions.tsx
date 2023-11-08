import { Alert, PermissionsAndroid } from "react-native";
import firebase from '@react-native-firebase/app';
import { firebaseConfig, firebaseGoogleConfig } from "./config";
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appConfig } from "./constants";
import firestore from '@react-native-firebase/firestore';


export const consolelog = (msg: any) => {
    if (appConfig.showConsoleLog) {
        console.log('ConsoleLog : ' + msg)
    }
}

export const CloudMessaging = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        consolelog('Authorization status: ' + authStatus);
    }

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        consolelog('Message handled in the background : ' + remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
        consolelog(JSON.stringify(remoteMessage))
    });

    return unsubscribe;
    consolelog('Getting Permissions from async function')
}

export const IntFirebase = async () => {
    consolelog('Firebaes initalized')
    if (firebase.apps.length === 0) {
        const firebaseApp = await firebase.initializeApp(firebaseConfig)
        if (appConfig.showConsoleLog) { consolelog('Firebase App Initialized from Firebase Function') }
    } else { const firebaseApp = await firebase.app() }
}

export const ForegroungFirebaeMsg = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
}

export const FCMDeviceToken = async () => {
    const deviceToken = await messaging().getToken()
    return 'device token';
}

export const CheckFirebaseEmailLogin = async () => {
    consolelog('WIll check Firebase Email Login Status')
    return CheckFirebaseEmailLogin;
}



export const FirebaseEmailLoginCheck = async () => {

    const currentUser = await auth().currentUser?.email;
    if (currentUser != null) {
        return true;

    }
    return false;
}

export const SignoutFirebaseEmailLogin = async () => {
    try {
        await auth().signOut();
        consolelog('Signout from FIrebase Email Login')
    } catch (error) {
        consolelog('SignoutFirebaseEmailLogin Error : ' + error)
    }
}

export const FirebaseGoogleLoginCheck = async () => {

    const currentUser = await GoogleSignin.getCurrentUser()
    if (currentUser != null) {
        return true;
    }
    return false;
}

export const SignoutFirebaseGoogleLogin = async () => {
    try {
       await  GoogleSignin.configure({
            webClientId: firebaseGoogleConfig.clientId,
        });
        const currentUser = await GoogleSignin.signOut()
        consolelog('Signout from FIrebase Google Login')
    } catch (error) {
        consolelog('SignoutFirebaseGoogleLogin Error : ' + error)
    }
}

export const LogUserDataToFirebaseDdatabase = async(uid:any, name:any, email:any, avatar:any)=>{
    const deviceToken = await messaging().getToken()

    await firestore().collection('users').doc(uid).set({
        uid: uid,
        name:name,
        email: email,
        avatar: avatar,
        deviceToken:deviceToken,
      })

}