import { View, Text, Pressable } from 'react-native'
import React from 'react'
import PageBackground from '../../components/PageBackground'
import { globalStyles } from '../../utils/styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { HapticFeedback } from '../../utils/functions';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { appConfig } from '../../utils/config';


type propsType = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;
const ProfileScreen = (props: propsType) => {
  const { navigation, route } = props;


  return (
    <View style={[globalStyles.page_container]} >
      <PageBackground />

      {/* Top Tabbar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
        <Pressable onPress={() => {
          HapticFeedback()
          navigation.goBack();
        }}>
          <View style={{ height:appConfig.size.pressableTopIcon, width: appConfig.size.pressableTopIcon, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
            <View style={{}}>
              <IonIcon name="arrow-back" size={24} color="#fff" />
            </View>
          </View>
        </Pressable>
      
        
      </View>

      <View style={[globalStyles.page_content]}>
        <Text>Profile</Text>
      </View>
    </View>
  )
}

export default ProfileScreen