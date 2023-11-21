import {  Image, StyleSheet,View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { strings } from '../../utils/strings';
import { globalStyles } from '../../utils/styles';
import { FirebaseEmailLoginCheck, FirebaseGoogleLoginCheck, IntFirebase, consolelog } from '../../utils/functions';
import PageBackground from '../../components/PageBackground';



type SplashProps = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen = ({ navigation }: SplashProps) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [num, setNum] = useState('0');
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

      if (emailLogin) {
        navigation.replace('MainScreen')
      } else if (googleLogin) {
        navigation.replace('MainScreen')
      } else {
        navigation.replace('LoginScreen')
      }
    })
  }

  const CheckAuthStatus = async () => {

  }

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
    <View style={[globalStyles.page_container]} >
      <PageBackground />
      <View style={[globalStyles.page_content, styles.splash_page_content]}>
        <Image source={strings.appLogoPath} style={styles.app_logo} />
      </View>
    </View>


  )
}

export default SplashScreen

const styles = StyleSheet.create({
  


  splash_page_content: { justifyContent: 'center', alignItems: 'center' },
  app_logo:{height:40,resizeMode:'contain'}
})