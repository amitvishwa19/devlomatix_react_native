import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { strings } from '../utils/strings';
import { globalStyles } from '../utils/styles';
import { globalcolors } from '../utils/colors';
import { IntFirebase, consolelog } from '../utils/functions';
import auth from '@react-native-firebase/auth';


type SplashProps = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen = ({navigation}:SplashProps) => {
  

  useEffect(() => {
    firebase();

  }, [])

  const firebase = () => {
    IntFirebase().then(() => {
      const user = auth().currentUser;
      if (user == null) {
        consolelog('No user found : move to Login screen')
        navigation.replace('LoginScreen')
      } else {
        //navigation.replace('MainScreen')
        consolelog('User found : move to Main screen')
      }
    })
  }
  return (
    <View style={globalStyles.root}>
      <StatusBar hidden={true} />
      <ImageBackground source={strings.pageBackground} resizeMode="cover" style={globalStyles.background_image_container} imageStyle={styles.image}>
        <Image source={strings.appLogoPath} style={styles.logo} />
      </ImageBackground>

    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  image: { opacity: 0.7, backgroundColor: globalcolors.black },
  logo: { height: '5%', resizeMode: 'contain' }
})