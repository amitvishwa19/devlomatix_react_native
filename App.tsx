import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SplashScreen, LoginScreen, RegisterScreen, MainScreen } from './src/screens';
import { GetPermissions } from './src/utils/functions';



export type RootStackParamList = {
  SplashScreen: undefined,
  LoginScreen:undefined,
  RegisterScreen:undefined
  MainScreen:undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  useEffect(() => {
    GetPermissions();
    //ForegroungFirebaeMsg();
  }, [])

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}


export default App;
