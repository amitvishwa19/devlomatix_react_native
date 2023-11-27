import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SplashScreen, LoginScreen, RegisterScreen, MainScreen, DoctorsList, HomeScreen, ChatWindow, DoctorDetailsScreen, UserDetailsScreen, ProfileScreen, ChatsListScreen, RecordsScreen, FeedsScreen, GuideScreen, AppointmentScreen, QuestionsScreen, ConsultationScreen, ReminderScreen, CareTeamScreen } from './src/screens';
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
  SettingsScreen: undefined
  DocumentsScreen: undefined
  DoctorsList:undefined,
  ChatWindow:{data:DoctorDataType, uid:any, avatar:string,name:string,suid:any},
  DoctorDetailsScreen:{image:any,uid:any}
  ChatsListScreen:any,
  UserDetailsScreen:any,
  RecordsScreen:any,
  FeedsScreen:any,
  GuideScreen:any,
  AppointmentScreen:any,
  QuestionsScreen:any,
  ConsultationScreen:any,
  ReminderScreen:any,
  CareTeamScreen:any
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
          <Stack.Screen name='ChatsListScreen' component={ChatsListScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ChatWindow' component={ChatWindow} options={{ headerShown: false }} />
          <Stack.Screen name='UserDetailsScreen' component={UserDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='DoctorDetailsScreen' component={DoctorDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name='RecordsScreen' component={RecordsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='FeedsScreen' component={FeedsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='GuideScreen' component={GuideScreen} options={{ headerShown: false }} />
          <Stack.Screen name='AppointmentScreen' component={AppointmentScreen} options={{ headerShown: false }} />
          <Stack.Screen name='QuestionsScreen' component={QuestionsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ConsultationScreen' component={ConsultationScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ReminderScreen' component={ReminderScreen} options={{ headerShown: false }} />
          <Stack.Screen name='CareTeamScreen' component={CareTeamScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>




  );
}


export default App;
function conslolelog(arg0: string) {
  throw new Error('Function not implemented.');
}

