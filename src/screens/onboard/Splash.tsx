import { StyleSheet, Text, View, StatusBar, ImageBackground, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { colors } from '../../utils/colors';
import { strings } from '../../utils/strings';
import { consolelog } from '../../functions/consoleLog';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { FCMDeviceToken, IntFirebase } from '../../utils/functions';



type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
const { height, width } = Dimensions.get('window');


const Splash = ({ navigation }: SplashProps) => {
  const [user, setUser] = useState(null)
  const [route, setRoute] = useState('Login')

  useEffect(() => {
    firebase();
  }, []);

  

  const firebase = ()=>{
    IntFirebase().then(()=>{
      const user = auth().currentUser;
      if (user == null) {
        consolelog('No user found : move to Login screen')
        navigation.replace('Login')
      } else {
        //navigation.replace('MainScreen')
        consolelog('User found : move to Main screen')
      }
    })
  }

  const deviceToken = async()=>{
    const authStatus = await messaging().requestPermission();
    const deviceToken = await messaging().getToken()
  }



  return (
    <View style={styles.root}>
      <StatusBar hidden={true} />
      <ImageBackground source={strings.pageBackground} resizeMode="cover" imageStyle={styles.image} style={styles.container}>
        <Image source={strings.appLogoPath} style={styles.logo} />
      </ImageBackground>
    </View>
  )
}

export default Splash


const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', backgroundColor: colors.darkMode, alignItems: 'center' },
  image: { opacity: 0.7, backgroundColor: colors.black },
  text: { fontSize: 60, fontWeight: 'bold', color: '#000', textShadowColor: 'orange', textShadowRadius: 5 },
  logo: { height: 50, width: width, resizeMode: 'contain' }
})