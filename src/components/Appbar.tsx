import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { strings } from '../utils/constants'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDataType } from '../utils/types';
import { appConfig } from '../utils/config';
import Avatar from './Avatar';

const Appbar = ({ navigation }: any) => {
  const [user, setUser] = useState<UserDataType>();

  useLayoutEffect(() => {
    getUserData();
  }, [])

  const getUserData = async () => {
    const jsonValue = await AsyncStorage.getItem('user');
    const result: UserDataType = JSON.parse(jsonValue || '{}');
    setUser(result)

  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: 10 }}>
          <Avatar image={user?.avatar} size={40} click={()=>{navigation.navigate('ProfileScreen')}}/>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 14 }}>Hi, {user?.name}</Text>
          <Text style={{ color: '#fff', fontSize: 12 }}>How are you feeling today</Text>
        </View>
      </View>

      <Pressable onPress={() => {
        navigation.navigate('MainScreen', { screen: 'Notifications' });
      }}>
        <View style={{ height: appConfig.size.pressableTopIcon, width: appConfig.size.pressableTopIcon, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
          <View style={{}}>
            <IonIcon name="notifications" size={24} color="#fff" />
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default Appbar

const styles = StyleSheet.create({})