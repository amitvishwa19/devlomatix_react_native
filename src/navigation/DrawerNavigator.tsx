import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigator';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/home/Home';
import Profile from '../screens/home/Profile';
import Settings from '../screens/home/Settings';
import Main from '../screens/home/Main';
import CustomDrawer from '../components/CustomDrawer';



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
//  const navigation = useNavigation();

//   navigation.setOptions({
//     headerShown: false,
//   })

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer  {...props}/> }>
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator