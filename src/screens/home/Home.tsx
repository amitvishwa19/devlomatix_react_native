import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Styles from '../../utils/styles'
import { useNavigation } from '@react-navigation/native';

// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import { RootStackParamList } from '../App';

// type HomeProps = NativeStackScreenProps<RootStackParamList,'Home'>;

const Home = () => {

  const navigation = useNavigation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })

    },[])
    
  return (
    <View style={Styles.container_center}>
      <Text style={Styles.BoldTitle}>Home Screen</Text>
      <Button title='Go To Settings Page'  />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})