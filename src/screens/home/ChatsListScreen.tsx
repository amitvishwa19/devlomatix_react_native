import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../utils/styles'
import PageBackground from '../../components/PageBackground'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DocumentsScreen from './DocumentsScreen'
import ProfileScreen from './ProfileScreen'
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';
import moment from 'moment'
import { Collection } from 'mongoose'
import Avatar from '../../components/Avatar'

const Tab = createMaterialTopTabNavigator();

const ChatsListScreen = () => {
    const [chats, setChats] = useState<any | null>([]);

    useEffect(() => {
        console.log('useEffect called in ChatListScreen')
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
                        console.log('User found')
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
                <Text style={{ color: '#fff' }}>Chats List Screen </Text>

                <FlatList
                    data={chats}
                    keyExtractor={(item, index) => { return index.toString() }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index, separators }) => {
                        return (
                            <View style={styles.block}>
                                <View style={styles.background}></View>
                                <View style={styles.content}>
                                    <View style={{ marginRight: 20 }}>
                                        <Avatar image={item.reciverAvatar} size={45} click={() => { }} />
                                    </View>
                                    <View>
                                        <Text style={{ color: '#fff' }}>{item.reciverName}</Text>
                                        <Text style={{ color: '#fff', fontSize: 12, opacity: 0.6 }}>{item.lastMsg}</Text>
                                    </View>
                                </View>

                            </View>
                        )
                    }}


                />

            </View>
        </View>
    )
}

export default ChatsListScreen

const styles = StyleSheet.create({
    block: { marginVertical: 5 },
    background: { backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2, padding: 10 },
    content: { padding: 10, flexDirection: 'row' },
})