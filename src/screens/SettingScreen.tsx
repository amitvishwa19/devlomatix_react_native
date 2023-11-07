import { ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { strings } from '../utils/strings';
import { globalcolors } from '../utils/colors';
import { globalStyles } from '../utils/styles';
import { colors, constants } from '../utils/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import auth from '@react-native-firebase/auth';
import { consolelog } from '../utils/functions';


type SettingScreenProp = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>;
const SettingScreen = ({navigation}:SettingScreenProp) => {

  const logout=async()=>{
    auth().signOut().then(()=>{
      consolelog('App logout')
      navigation.replace('LoginScreen')
    })
  }
  return (
    <View style={[globalStyles.root]} >
      <StatusBar hidden={false} backgroundColor={colors.primaryColor} />
      <ImageBackground source={strings.pageBackground} resizeMode="cover" style={globalStyles.background_image_container} imageStyle={styles.image}>
        <View style={styles.page_title_block}>
          <Text style={styles.page_title}>Settings</Text>
        </View>

        <View style={styles.block}>
          <View style={{ backgroundColor: '#fff', height: '100%', width: '100%', position: 'absolute', opacity: 0.2, borderRadius: 8 }}></View>
          <View style={styles.block_item}>
            <Text style={styles.block_item_title}>Logout</Text>
            <TouchableOpacity onPress={logout}>
            <IonIcon name="log-out-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>




    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  root: { padding: 10, },
  image: { opacity: constants.pageBackgroundOpacity },
  page_title_block: { marginBottom: 14 },
  page_title: { fontSize: 22, color: '#fff', fontWeight: '400' },
  block: {},
  block_item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical:15,paddingHorizontal:10 },
  block_item_title: { color: '#fff', fontSize: 18 },
  block_item_icon: { color: '#fff' }
})