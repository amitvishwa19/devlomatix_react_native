import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SplashScreen, LoginScreen, RegisterScreen, MainScreen, DoctorsList, HomeScreen, ChatWindow, DoctorDetailsScreen, UserDetailsScreen, ProfileScreen } from './src/screens';
import { ForegroungFirebaeMsg } from './src/utils/functions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DoctorDataType } from './src/utils/types';

export type RootStackParamList = {
  SplashScreen: undefined,
  LoginScreen: undefined,
  RegisterScreen: undefined
  MainScreen: undefined,
  HomeScreen: undefined,
  ProfileScreen: undefined,
  NotificationScreen: undefined,
  SettingScreen: undefined,
  SettingsScreen: undefined
  DocumentsScreen: undefined
  DoctorsList:undefined,
  ChatWindow:{data:DoctorDataType, uid:any, avatar:any},
  DoctorDetailsScreen:{image:string,uid:string}
  ChatsListScreen:any,
  UserDetailsScreen:any
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  useEffect(() => {
    ForegroungFirebaeMsg();

    //consolelog(JSON.stringify(firebaseConfig));
    //consolelog(JSON.stringify(appConfig.firebaseConfig));
  }, [])


  return (
    <GestureHandlerRootView style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name='DoctorsList' component={DoctorsList} options={{ headerShown: false }} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ChatWindow' component={ChatWindow} options={{ headerShown: false }} />
          <Stack.Screen name='UserDetailsScreen' component={UserDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='DoctorDetailsScreen' component={DoctorDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen name='DocumentsScreen' component={DocumentsScreen} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name='NotificationScreen' component={NotificationScreen} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name='SettingScreen' component={SettingScreen} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>




  );
}


export default App;
function conslolelog(arg0: string) {
  throw new Error('Function not implemented.');
}

