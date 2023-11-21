import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageBackground from '../../components/PageBackground'
import { globalStyles } from '../../utils/styles'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NotificationData } from '../../utils/data';
import { AddDataToFirebase, HapticFeedback, IconColor, consolelog } from '../../utils/functions';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { notificationDataType } from '../../utils/types';


const NotificationScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState(true);
  const [notificationsData, setNotificationsData] = useState<notificationDataType[]>([])


  const data = {
    userId: 'DdvSXXUIF5Qut7uJxVd5V61pNQg1',
    title: 'Appolo hohpital added 20 new beds',
    description: 'Your serial is successfully added in appointment list,serial id 25,We will notify you before 15 mins',
    icon: 'information-circle-outline',
    type: 'info',
    seen: false,
    created: new Date().toUTCString(),
    updated: new Date().toUTCString(),
  }

  const toggleNotification = () => {
    HapticFeedback()
    setNotifications(!notifications);
    notifications
      ? ToastAndroid.showWithGravity('Notification turned off', ToastAndroid.SHORT, ToastAndroid.CENTER)
      : ToastAndroid.showWithGravity('Notification turned on', ToastAndroid.SHORT, ToastAndroid.CENTER)
    // AddDataToFirebase('notifications', data).then(() => {
    //   ToastAndroid.showWithGravity('Notification data added successfully', ToastAndroid.SHORT, ToastAndroid.CENTER)
    // });
  }

  useEffect(() => {

    const noti = firestore().collection("notifications").orderBy("created", "asc").onSnapshot(
      qerySnapshot => {
        const notifications: any = []
        qerySnapshot.forEach((doc) => {
          notifications.push(
            {
              userId: doc.data().userId,
              title: doc.data().title,
              description: doc.data().description,
              icon: doc.data().icon,
              type: doc.data().type,
              seen: doc.data().seen,
              created: doc.data().created,
              updated: doc.data().updated
            }
          )
        })
        setNotificationsData(notifications)

      }
    )

    return () => noti();
  },[])




  const test = () => {
    console.log('test')
  }

  return (

    <View style={[globalStyles.page_container, globalStyles.main_screen_container]} >


      <PageBackground />

      {/* Top Tabbar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
        <Pressable onPress={() => {
          HapticFeedback()
          navigation.navigate('MainScreen', { screen: 'Home' });
        }}>
          <View style={{ height: 45, width: 45, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
            <View style={{}}>
              <IonIcon name="arrow-back" size={24} color="#fff" />
            </View>
          </View>
        </Pressable>
        <Pressable onPress={toggleNotification}>
          <View style={{ height: 45, width: 45, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'transparent', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
            <View style={{}}>
              {notifications ? <IonIcon name="notifications" size={24} color="#fff" /> : <IonIcon name="notifications-off-outline" size={24} color="#fff" />}
            </View>
          </View>
        </Pressable>
      </View>



      <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
        <View style={styles.notification_block}>
          <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
          {
            notificationsData.map((data, index) => {
              var iconColor = IconColor(data.type);
              return (
                <View key={index} style={styles.notification_block_content}>
                  <View style={{ width: '10%' }}>
                    <IonIcon name={data.icon} color={'#fff'} size={16} style={[styles.notification_block_content_icon, { color: iconColor }]} />
                  </View>
                  <View style={{ width: '90%' }}>
                    <Text style={styles.notification_block_content_title}>{data.title}</Text>
                    <Text style={styles.notification_block_content_description}>{data.description}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>



    </View>

  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  notification_block: { marginBottom: 10 },
  notification_block_date: { color: '#fff', marginBottom: 5 },
  notification_block_content: { padding: 10, flexDirection: 'row', justifyContent: 'space-between' },
  notification_block_content_icon: { fontWeight: 'bold', marginTop: 4, marginRight: 10 },
  notification_block_content_title: { color: '#fff', fontSize: 14, fontWeight: '500', marginBottom: 4, letterSpacing: 0.5 },
  notification_block_content_description: { color: '#fff', fontSize: 12, opacity: 0.8, marginBottom: 4 },
  divider: { height: 0.5, width: '95%', backgroundColor: '#fff', marginHorizontal: 10, opacity: 0.2, alignItems: 'center' }
})