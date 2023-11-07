import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SplashScreen, LoginScreen, RegisterScreen, MainScreen, HomeScreen, ProfileScreen, NotificationScreen, SettingScreen } from './src/screens';
import { CloudMessaging, consolelog } from './src/utils/functions';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';



export type RootStackParamList = {
  SplashScreen: undefined,
  LoginScreen: undefined,
  RegisterScreen: undefined
  MainScreen: undefined,
  HomeScreen: undefined,
  ProfileScreen: undefined,
  NotificationScreen: undefined,
  SettingScreen: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  useEffect(() => {
    CloudMessaging();
  }, [])

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name='NotificationScreen' component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SettingScreen' component={SettingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}


export default App;
