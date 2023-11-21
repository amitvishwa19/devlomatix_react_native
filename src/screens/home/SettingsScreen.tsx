import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { FirebaseEmailLoginCheck, FirebaseGoogleLoginCheck, SignoutFirebaseEmailLogin, SignoutFirebaseGoogleLogin } from '../../utils/functions';
import { globalStyles } from '../../utils/styles';
import Dialog from "react-native-dialog";
import PageBackground from '../../components/PageBackground';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { appConfig } from '../../utils/config';


type SettingsScreenProp = NativeStackScreenProps<RootStackParamList, 'SettingsScreen'>;
const SettingsScreen = ({navigation}:any) => {

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

    if (await FirebaseEmailLoginCheck()) {
      await SignoutFirebaseEmailLogin()
    }
    if (await FirebaseGoogleLoginCheck()) {
      await SignoutFirebaseGoogleLogin()
    }
    navigation.replace('LoginScreen')

  }

  
  return (
    <View style={[globalStyles.page_container]} >
      
      <Dialog.Container visible={visible}>
        <Dialog.Title>Logout</Dialog.Title>
        <Dialog.Description>
          Are you sure !, want to logout from app?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Logout" onPress={logout} />
      </Dialog.Container>
      <PageBackground />


      <View style={[globalStyles.page_content]}>


        <View style={styles.page_title_area}>
          <Text style={styles.page_title_text}>Settings</Text>
        </View>


        <View style={{}}>
          <View style={{ backgroundColor: '#fff', height: '100%', width: '100%', position: 'absolute', opacity: 0.2, borderRadius: 5 }}>

          </View>
          <View style={{ padding: 10 }}>
            <View style={styles.page_blocks_item}>
              <Text style={styles.page_blocks_item_text}>Version</Text>
              <Text style={styles.page_blocks_item_text}>{appConfig.global.version}</Text>
            </View>

            <View style={styles.page_blocks_item}>
              <Text style={styles.page_blocks_item_text}>Logout</Text>
              <Pressable onPress={showDialog}>
                <IonIcon name="log-out-outline" size={20} color="#fff" />
              </Pressable>
            </View>

          </View>

        </View>


      </View>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  page_title_area: { marginVertical: 10, marginBottom: 20 },
  page_title_text: { fontSize: 18, fontWeight: 'bold', color: '#fff' },








  page_blocks: { backgroundColor: '#0000', padding: 5, opacity: 0.5, borderRadius: 5, },
  page_blocks_item: { paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  page_blocks_item_text: { color: '#fff', fontWeight: '500' }
})