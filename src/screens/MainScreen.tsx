import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import IonIcon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';
import SettingScreen from './SettingScreen';
import { strings } from '../utils/strings';

const BottomTab = createBottomTabNavigator();
type MainScreenProp = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

const MainScreen = ({navigation}:MainScreenProp) => {

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
        title: strings.appName,
        headerTransparent: true,
        headerTitleStyle: {
            color: 'red',
            //textAlign: 'center'
            
        },
        headerStyle: {
            //height: 50,
            //backgroundColor: 'blue',
            //borderBottomColor: 'transparent',
            //elevation: 0,
            //shadowOpacity: 0,
            //borderBottomWidth: 0,

        },
        headerTitleAlign: 'center',
        // headerLeft: () => {
        //    return  <Feather name="home" size={24} color="#003580" />
        // },
        // headerRight: () => {
        //     return <Feather name="home" size={24} color="#003580" />
        // }
    })

}, [])

  const ScreenOptions ={
    headerShown: false, 
    tabBarShowLabel: false,
  }
  return (
    <BottomTab.Navigator screenOptions={ScreenOptions}>
    <BottomTab.Screen name="Home"
        component={HomeScreen}
        options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({ focused }) => focused ? (<IonIcon name="home" size={24} color="#003580" />) : (<IonIcon name="home-outline" size={24} color="black" />)
        }}
    />
    <BottomTab.Screen name="Profile"
        component={ProfileScreen}
        options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarIcon: ({ focused }) => focused ? (<IonIcon name="person" size={24} color="#003580" />) : (<IonIcon name="person-outline" size={24} color="black" />)
        }} />
    <BottomTab.Screen name="Notification"
        component={NotificationScreen}
        options={{
            tabBarLabel: 'NOtifications',
            headerShown: false,
            tabBarIcon: ({ focused }) => focused ? (<IonIcon name="notifications" size={24} color="#003580" />) : (<IonIcon name="notifications-outline" size={24} color="black" />)
        }} />
    <BottomTab.Screen name="Settings"
        component={SettingScreen}
        options={{
            tabBarLabel: 'Settings',
            headerShown: false,
            tabBarIcon: ({ focused }) => focused ? (<IonIcon name="settings" size={24} color="#003580" />) : (<IonIcon name="settings-outline" size={24} color="black" />)
        }} />
</BottomTab.Navigator>
  )
}

export default MainScreen

const styles = StyleSheet.create({})