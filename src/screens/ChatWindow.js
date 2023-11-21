import { Pressable, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { globalStyles } from '../utils/styles'
import PageBackground from '../components/PageBackground'
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { HapticFeedback } from '../utils/functions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Avatar from '../components/Avatar';
import { Send, GiftedChat, InputToolbar, MessageContainer } from 'react-native-gifted-chat'
import { appConfig } from '../utils/config';
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'


//type propsType = NativeStackScreenProps<RootStackParamList, 'ChatWindow'>;
const ChatWindow = (props) => {
  const { navigation, route } = props;
  const { data, uid, avatar } = route.params
  const [messages, setMessages] = useState([]);
  const docId = uid > data.uid ? data.uid + '-' + uid : uid + '-' + data.uid
  const [user, setUser] = useState(null)

  useEffect(() => {
    getMessages();
    myData();
  }, [])

  const myData = async () => {
    const userdata = await AsyncStorage.getItem('user')
    const user = JSON.parse(userdata)
    //console.log('User Data : ' , user.avatar)
    setUser(user)
  }

  const getMessages = async () => {
    //Getting from firestore
    const data = await firestore().collection('chatrooms').doc(docId).collection(uid).orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc._data)
      })
      setMessages(data)
    })
    return () => data();

    //getting from realtime
    // const data = database().ref('/chatrooms/' + docId).on('value', snapshot => {
    //   if (snapshot.val() != null) {
    //     const messages = database()
    //       .ref('/chatrooms/' + docId + '/' + uid)
    //       .orderByChild('createdAt', 'asc')
    //       .on('value', snapshot => {
    //         const data = []
    //         Object.values(snapshot.val()).forEach((e) => {
    //           data.push(e)
    //         })
    //         setMessages(data)
    //       });
    //   }
    // });
  }



  const sendMessage = async (messages = []) => {

    const msg = messages[0]
    const myMsg = {
      ...msg,
      sendBy: uid,
      sendTo: data.uid,
      createdAt: moment().format(),
      avatar: data.avatar,

    }

    const chatroomInfo = {
      roomName: '',
      owner: user.uid,
      lastMsg: msg.text,
      sender: user.uid,
      senderName: user.name,
      senderAvatar: user.avatar,
      reciver: data.uid,
      reciverName: data.name,
      reciverAvatar: data.avatar,
      users: [user.uid,data.uid],
      lastMsgTime: moment().format(),
    }

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))

    await firestore()
      .collection('chatrooms')
      .doc(docId)
      .set(chatroomInfo)
      .then(() => { 
         firestore().collection('chatrooms').doc(docId).collection(uid).add(myMsg).then(()=>{})
         firestore().collection('chatrooms').doc(docId).collection(data.uid).add(myMsg).then(()=>{})
      })

    //Store in firestore
    // await firestore().collection('chats').doc(docId).collection(uid).add(myMsg)
    //   .then(() => {
    //     createChatroom({
    //       roomName: '',
    //       lastMsg: msg.text,
    //       sender: user.uid,
    //       senderName: user.name,
    //       senderAvatar: user.avatar,
    //       reciver: data.uid,
    //       reciverName: data.name,
    //       reciverAvatar: data.avatar

    //     }, user.uid)
    //   })
    // await firestore().collection('chats').doc(docId).collection(data.uid).add(myMsg)
    //   .then(() => {
    //     createChatroom({
    //       roomName: '',
    //       lastMsg: msg.text,
    //       sender: user.uid,
    //       senderName: user.name,
    //       senderAvatar: user.avatar,
    //       reciver: data.uid,
    //       reciverName: data.name,
    //       reciverAvatar: data.avatar
    //     },data.uid)
    //   })


    //const senderMessage = database().ref('/chatrooms/' + docId + '/' + uid).push( myMsg ).then(() => console.log('Sender Message',uid));
    //const reciverMessage = database().ref('/chatrooms/' + docId + '/' + data.uid).push( myMsg ).then(() => console.log('Reciver Message',data.uid));
  }

  // const createChatroom = async (myMsg,id) => {
  //   // database()
  //   //   .ref('/chatrooms/' + docId + '/' +id).set(myMsg)
  //   //   .then(() => console.log('New Chatroom Created:', docId));

  //   await firestore().collection('chatrooms').doc(docId).collection('addadas').add({dadad:'adadasdasd'}).then(()=>{
  //     console.log('chatroom created')
  //   })
  // }


  return (
    <View style={[styles.page_container, globalStyles.main_screen_container]} >
      <PageBackground />

      <View style={{ flex: 1 }}>

        {/* Top Tabbar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, height: '6%', marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'row' }}>
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


          </View>

          <View style={styles.userinfo}>
            <Text style={styles.username}>{data.name}</Text>
          </View>


          <View>
            <Pressable onPress={() => { }}>
              <Avatar image={data.avatar} size={45} />
            </Pressable>
          </View>
        </View>

        <View style={{ height: '94%' }}>
          <GiftedChat
            messages={messages}
            onSend={messages => sendMessage(messages)}
            user={{
              _id: uid,
              //avatar: data.avatar,
              name: data.name,

            }}

            renderUsernameOnMessage={true}
            onPress={(i) => { console.log('msg clicked', i) }}
            alwaysShowSend={true}
            renderAvatar={null}
            //onInputTextChanged={(text)=>{console.log('Text typing ; ',text)}}
            renderSend={(props) => {
              return (
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginRight: 10 }}>
                    <TouchableOpacity onPress={() => { Toast.show('Record', 2000) }} style={{ marginRight: 10, }}>
                      <Image source={appConfig.icon.record} style={{ height: 24, width: 24 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Toast.show('Attach file', 2000) }} style={{ marginRight: 10, }}>
                      <Image source={appConfig.icon.attach} style={{ height: 24, width: 24 }} />
                    </TouchableOpacity>
                  </View>
                  <Send {...props} containerStyle={{ justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                    <Image source={appConfig.icon.send} style={{ height: 24, width: 24, marginRight: 10, marginBottom: 5 }} />
                  </Send>
                </View>
              )
            }}
            renderInputToolbar={(props) => {
              return (
                <InputToolbar {...props} containerStyle={{ justifyContent: 'center', borderTopColor: 'transparent' }}></InputToolbar>
              )
            }}

            messageContainerRef={(props) => {
              return (
                <MessageContainer {...props} contentContainerStyle={{ backgroundColor: 'red' }}></MessageContainer>
              )
            }}

          />
        </View>

      </View>

    </View>
  )
}

export default ChatWindow

const styles = StyleSheet.create({
  page_container: { flex: 1, backgroundColor: appConfig.colors.primaryColor },
  userinfo: { height: 45, width: '70%', justifyContent: 'center', alignItems: 'center' },
  username: { color: '#fff', justifyContent: 'center', fontSize: 18, fontWeight: '500' },
})