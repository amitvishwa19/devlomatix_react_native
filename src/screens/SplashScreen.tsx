import { Button, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { strings } from '../utils/strings';
import { globalStyles } from '../utils/styles';
import { globalcolors } from '../utils/colors';
import { FirebaseEmailLoginCheck, FirebaseGoogleLoginCheck, IntFirebase, consolelog } from '../utils/functions';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


type SplashProps = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen = ({ navigation }: SplashProps) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [num,setNum] = useState ('0');
  const [user, setUser] = useState('')

  useEffect(() => {
    
    setTimeout(() => {
      InitializeFirebae()
    }, 2000);
  }, [])

 

  //THis will intialize Firebase
  const InitializeFirebae = async () => {
    await IntFirebase().then(async () => {
      const emailLogin = await FirebaseEmailLoginCheck();
      const googleLogin = await FirebaseGoogleLoginCheck();

      consolelog('Firebase Email Login: ' + emailLogin)
      consolelog('Firebase Google Login: ' + googleLogin)
      
      if(emailLogin){
        navigation.replace('MainScreen')
      }else if(googleLogin){
        navigation.replace('MainScreen')
      }else{
        navigation.replace('LoginScreen')
      }
    })
  }

  const CheckAuthStatus = async () => {

  }

  // const FirebaseEmailLoginCheck = async () => {
  //   consolelog('Checking Firebase Email Login check')
  //   const currentUser = await auth().currentUser?.email;
  //   if(currentUser != null){
  //     return true;
  //   }
  //   return false;
  // }

  // const FirebaseGoogleLoginCheck = async () => {
  //   consolelog('Checking Firebase Google Login check')
  //   const currentUser = await GoogleSignin.getCurrentUser()
  //   if(currentUser != null){
  //     return true;
  //   }
  //   return false;
  // }

  const ScreenRedirect = () => {
    consolelog('Screen Redirect After auth check screen will be redirected, authStatus : ' + authStatus)
    if (authStatus) {
      consolelog('User found : move to Main screen')
      navigation.replace('MainScreen')

    } else {
      consolelog('No user found : move to Login screen')
      navigation.replace('LoginScreen')
    }
  }


  return (
    <View style={globalStyles.root}>
      <StatusBar hidden={true} />
      <ImageBackground source={strings.splashBackgroundImage} resizeMode="cover" style={[globalStyles.background_image_container, styles.background_image_container]} imageStyle={styles.image}>
        <Image source={strings.appLogoPath} style={styles.logo} />
      </ImageBackground>

    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  background_image_container: { justifyContent: 'center', alignItems: 'center' },
  image: { opacity: 0.7, backgroundColor: globalcolors.black },
  logo: { height: '5%', resizeMode: 'contain' }
})