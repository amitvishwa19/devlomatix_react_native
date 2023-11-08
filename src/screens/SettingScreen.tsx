import { ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { strings } from '../utils/strings';
import { globalcolors } from '../utils/colors';
import { globalStyles } from '../utils/styles';
import { appcolors, constants } from '../utils/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import auth from '@react-native-firebase/auth';
import { FirebaseEmailLoginCheck, FirebaseGoogleLoginCheck, SignoutFirebaseEmailLogin, SignoutFirebaseGoogleLogin, consolelog } from '../utils/functions';
import Dialog from "react-native-dialog";

type SettingScreenProp = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>;
const SettingScreen = ({ navigation }: SettingScreenProp) => {
  const [visible, setVisible] = useState(false);


  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const logout = async () => {

    const emailLogin = await FirebaseEmailLoginCheck();
    const googleLogin = await FirebaseGoogleLoginCheck();

    if(await FirebaseEmailLoginCheck()){
      await SignoutFirebaseEmailLogin()
    }
    if(await FirebaseGoogleLoginCheck()){
      await SignoutFirebaseGoogleLogin()
    }
    navigation.replace('LoginScreen')

  }



  return (
    <View style={[globalStyles.root]} >
      <StatusBar hidden={false} backgroundColor={'#1C2833'} />
      <Dialog.Container visible={visible}>
        <Dialog.Title>Logout</Dialog.Title>
        <Dialog.Description>
          Are you sure !, want to logout from app?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Logout" onPress={logout} />
      </Dialog.Container>

      <ImageBackground source={strings.pageBackground} resizeMode="cover" style={globalStyles.background_image_container} imageStyle={styles.image}>
        <View style={styles.page_title_block}>
          <Text style={styles.page_title}>Settings</Text>
        </View>

        <View style={styles.block}>
          <View style={{ backgroundColor: '#fff', height: '100%', width: '100%', position: 'absolute', opacity: 0.2, borderRadius: 8 }}></View>
          <View style={styles.block_item}>
            <Text style={styles.block_item_title}>Logout</Text>
            <TouchableOpacity onPress={showDialog}>
              <IonIcon name="log-out-outline" size={20} color="#fff" />
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
  block_item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 },
  block_item_title: { color: '#fff', fontSize: 16 },
  block_item_icon: { color: '#fff' }
})