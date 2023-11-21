import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { globalStyles } from '../utils/styles'
import PageBackground from '../components/PageBackground'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { HapticFeedback } from '../utils/functions';
import { appConfig } from '../utils/config';
import Avatar from '../components/Avatar';


type propsType = NativeStackScreenProps<RootStackParamList, 'DoctorDetailsScreen'>;
const DoctorDetailsScreen = (props: propsType) => {
  const { navigation, route } = props;
  const { image, uid } = route.params

  useEffect(() => {
    //console.log(item)
  }, [])


  return (
    <View style={[globalStyles.page_container, globalStyles.main_screen_container]} >
      <PageBackground />
      <View>
        {/* Top Tabbar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
          <Pressable onPress={() => {
            HapticFeedback()
            navigation.goBack();
          }}>
            <View style={{ height: 45, width: 45, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
              <View style={{}}>
                <IonIcon name="arrow-back" size={24} color="#fff" />
              </View>
            </View>
          </Pressable>
          <View style={{ height: 45, width: '85%', justifyContent: 'center', }}>
            
            <Text>{uid}</Text>
          </View>
        
        </View>

        <Text>Doctor Details Screen</Text>
      </View>
    </View>
  )
}

export default DoctorDetailsScreen

const styles = StyleSheet.create({})