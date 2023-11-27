import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../utils/styles'
import PageBackground from '../../components/PageBackground'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import Avatar from '../../components/Avatar'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import { HapticFeedback } from '../../utils/functions'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { appConfig } from '../../utils/config'


const Tab = createMaterialTopTabNavigator();

type propsType = NativeStackScreenProps<RootStackParamList, 'ChatsListScreen'>;
const ChatsListScreen = (props: propsType) => {
    const { navigation, route } = props;
    const [chats, setChats] = useState<any | null>([]);
    const [searchString, setSearchString] = useState('');
    const [deleteChat, setDeleteChat] = useState(false)

    useEffect(() => {
        //console.log('useEffect called in ChatListScreen')
        myData();
        getChats();
    }, [])

    const myData = async () => {
        const user = await AsyncStorage.getItem('user')
        const userjson = JSON.parse(user!)
        //setUser(user)
        // console.log(userjson)
    }

    const getChats = async () => {
        const uid = await AsyncStorage.getItem('uid');
        const subscriber = await firestore()
            .collection('chatrooms')
            .onSnapshot(documentSnapshot => {
                const item: any = []
                documentSnapshot.forEach((doc) => {
                    //console.log('chatrooms: ', doc.data());

                    if (doc.data().users.includes(uid)) {
                        //console.log('User found',doc.data())
                        item.push(doc.data())
                    }
                })
                setChats(item)
            });

        // Stop listening for updates when no longer required
        return () => subscriber();

    }



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
                        <View style={{ height: appConfig.size.pressableTopIcon, width: appConfig.size.pressableTopIcon, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
                            <View style={{}}>
                                <IonIcon name="arrow-back" size={24} color="#fff" />
                            </View>
                        </View>
                    </Pressable>
                    <View style={{ height: appConfig.size.pressableTopIcon, width: '70%', justifyContent: 'center', }}>
                        <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                            <View style={{ backgroundColor: 'transparent', width: '90%' }}>
                                <TextInput style={{ color: '#fff', fontSize: appConfig.size.fontSize }}
                                    placeholder='Search . . . .'
                                    placeholderTextColor={'#fff'}
                                    value={searchString}
                                    keyboardType='default'
                                    onChange={event => setSearchString(event.nativeEvent.text)}
                                />
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Pressable onPress={() => { console.log(searchString) }}>
                                    <IonIcon name="search" size={20} color="#fff" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <Pressable onPress={() => { }}>
                        <View style={{ height: appConfig.size.pressableTopIcon, width: appConfig.size.pressableTopIcon, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
                            <View style={{}}>
                                <IonIcon name="location-outline" size={24} color="#fff" />
                            </View>
                        </View>
                    </Pressable>
                </View>


                <FlatList
                    data={chats}
                    keyExtractor={(item, index) => { return index.toString() }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index, separators }) => {
                        return (
                            <Pressable onPress={() => {
                                navigation.navigate('ChatWindow', { data: item, uid: item.sender, avatar: item.reciverAvatar, name: item.reciverName, suid: item.reciver })
                                console.log('ChatList item clicked')
                            }} onLongPress={() => { setDeleteChat(true) }}>
                                <View style={styles.block}>
                                    <View style={styles.background}></View>
                                    <View style={styles.content}>
                                        <View style={{ marginRight: 20 }}>
                                            <Avatar image={item.senderAvatar} size={45} click={() => { }} />
                                        </View>
                                        <View>
                                            <Text style={{ color: '#fff' }}>{item.senderName}</Text>
                                            <Text style={{ color: '#fff', fontSize: 12, opacity: 0.6 }}>{item.lastMsg}</Text>
                                            <Text style={{ color: '#fff', fontSize: 10, opacity: 0.4 }}>{moment(item.lastMsgTime).calendar()}</Text>
                                        </View>
                                    </View>

                                </View>
                            </Pressable>
                        )
                    }}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={deleteChat}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setDeleteChat(!setDeleteChat);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center',borderBottomColor:'#000'}}>
                                <Text style={{ color: '#000', fontWeight: '600' }}>Delete selected chat?</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Pressable
                                    style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
                                    onPress={() => setDeleteChat(!setDeleteChat)}>
                                    <Text style={{ fontWeight: 'bold', color: '#000' }}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
                                    onPress={() => setDeleteChat(!setDeleteChat)}>
                                    <Text style={{ fontWeight: '500', color: '#000' }}>Delete</Text>
                                </Pressable>

                            </View>
                        </View>
                    </View>
                </Modal>


            </View>
        </View>
    )
}

export default ChatsListScreen

const styles = StyleSheet.create({
    block: { marginVertical: 5 },
    background: { backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2, padding: 10 },
    content: { padding: 10, flexDirection: 'row', alignItems: 'center' },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '80%',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,

    },
    button: {
        borderRadius: 1,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})