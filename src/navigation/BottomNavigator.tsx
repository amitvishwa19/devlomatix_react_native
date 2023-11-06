import { StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Settings from '../screens/home/Settings';
import Profile from '../screens/home/Profile';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { strings } from '../utils/strings';

const BottomTab = createBottomTabNavigator();

export default function BottomNavigator() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: strings.appName,
            headerTransparent: true,
            headerTitleStyle: {
                color: 'red',
                textAlign: 'center'
            },
            headerStyle: {
                height: 50,
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
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (<IonIcon name="home" size={24} color="#003580" />) : (<IonIcon name="home-outline" size={24} color="black" />)
                }}
            />
            <BottomTab.Screen name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (<IonIcon name="person" size={24} color="#003580" />) : (<IonIcon name="person-outline" size={24} color="black" />)
                }} />
            <BottomTab.Screen name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (<IonIcon name="settings" size={24} color="#003580" />) : (<IonIcon name="settings-outline" size={24} color="black" />)
                }} />
        </BottomTab.Navigator>
    )
}

const styles = StyleSheet.create({})