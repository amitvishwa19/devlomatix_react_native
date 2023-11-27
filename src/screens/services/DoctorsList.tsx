import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { globalStyles } from '../../utils/styles'
import PageBackground from '../../components/PageBackground'
import { appConfig } from '../../utils/config'
import { HapticFeedback } from '../../utils/functions'
import IonIcon from 'react-native-vector-icons/Ionicons';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { DoctorDataType, UserDataType } from '../../utils/types'
import { ScrollView } from 'react-native-gesture-handler'
import Block from '../../components/Block'
import Avatar from '../../components/Avatar'
import Loader from '../../components/Loader'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import AsyncStorage from '@react-native-async-storage/async-storage'



type propsType = NativeStackScreenProps<RootStackParamList, 'DoctorsList'>;
const DoctorsList = (props: propsType) => {
    const { navigation, route } = props;
    const [searchString, setSearchString] = useState('');
    const [doctors, setDoctors] = useState<DoctorDataType[]>([]);
    const [loding, setLoading] = useState(true)
    const [uid, setUid] = useState<string | null>(null)
    const [avatar, setAvatar] = useState<string | null>(null)
    const [showNoDoctorMsg, setShowNoDoctorMsg] = useState(false)
    


    useEffect(() => {
        
        navigation.setOptions({
            headerShown: false,
            title: 'Doctors',
            headerTransparent: false,
            headerTitleStyle: {
                color: appConfig.colors.primaryColor,
                //textAlign: 'center'
            },
            headerStyle: {
                //height: 50,
                //backgroundColor: 'blue',
                //borderBottomColor: 'transparent',
                //elevation: 0,
                //shadowOpacity: 0,
                //borderBottomWidth: 0,

            },
            headerTitleAlign: 'center',
            // headerLeft: () => {
            //    return  <Feather name="home" size={24} color="#003580" />
            // },
            // headerRight: () => {
            //     return <Feather name="home" size={24} color="#003580" />
            // }
        });
        getDoctorsList()
            .then(() => {    
                hideLoader().then(()=>{
                    if(doctors.length == 0){
                        setShowNoDoctorMsg(true)
                    }
                })
            });
    }, [])

    const hideLoader = async()=>{
        setLoading(false);
    }

    const getDoctorsList = async () => {
        setLoading(true)

        const user = await AsyncStorage.getItem('user')
        const uid = await AsyncStorage.getItem('uid');
        setUid(uid)

        const avatar = await AsyncStorage.getItem('avatar');
        setAvatar(avatar)


        const docs = await firestore()
            .collection("users")
            .where('uid', '!=', uid)
            .onSnapshot(qerySnapshot => {
                const data: any = []
                qerySnapshot.forEach((doc) => {
                    data.push(
                        {
                            uid: doc.data().uid,
                            name: doc.data().name,
                            email: doc.data().email,
                            avatar: doc.data().avatar,
                            dnd: doc.data().dnd,
                            loggedIn: doc.data().loggedIn,
                            deviceToken: doc.data().deviceToken,
                        }
                    )
                })
                setDoctors(data)

            }
            )

        return () => docs();
    }

    return (
        <View style={[globalStyles.page_container]} >
            <PageBackground />
            <View style={[globalStyles.page_content]}>

                {/* Top Tabbar */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                    <Pressable onPress={() => {
                        HapticFeedback()
                        navigation.goBack();
                    }}>
                        <View style={{ height: appConfig.size.pressableTopIcon, width:appConfig.size.pressableTopIcon, justifyContent: 'center', alignItems: 'center' }}>
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

                <View>
                    <FlatList style={{ marginTop: 5, borderRadius: 5 }}
                        data={doctors}
                        keyExtractor={item => item.uid}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index, separators }) => {
                            return (
                                <Pressable onPress={() => {
                                    navigation.navigate('DoctorDetailsScreen', { image: item.avatar, uid: item.uid })
                                }}>
                                    <View style={styles.block}>
                                        <View style={styles.background}></View>
                                        <View style={styles.content}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ width: '20%' }}>
                                                    <View>
                                                        <Avatar image={item.avatar} size={50} click={() => { }} />
                                                    </View>
                                                </View>
                                                <View style={{ width: '60%' }}>
                                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={{ color: '#fff', opacity: 0.6 }}>
                                                        {item.email}
                                                    </Text>
                                                    <Text style={{ color: '#fff', fontSize: 10, opacity: 0.6 }}>
                                                        25 Feedbacks
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: 'column', width: '10%' }}>
                                                    <Pressable style={styles.pressable} onPress={() => { navigation.replace('ChatWindow', { data: item, uid: uid, avatar: item.avatar , name: item.name, suid:item.uid}) }}>
                                                        <IonIcon name="chatbubble-ellipses-outline" size={20} color="#48C9B0" />
                                                    </Pressable >
                                                    <Pressable style={styles.pressable} onPress={() => { }}>
                                                        <IonIcon name="call-outline" size={20} color="#E74C3C" />
                                                    </Pressable>
                                                    <Pressable style={styles.pressable} onPress={() => { }}>
                                                        <IonIcon name="videocam-outline" size={20} color='#F1C40F' style={{ fontWeight: 'bold' }} />
                                                    </Pressable>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </Pressable>
                            )
                        }}
                    />
                </View>



                {
                    showNoDoctorMsg && doctors.length == 0 ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#fff', fontWeight: '500' }}>No  Doctor(s) found </Text>
                    </View> : null
                }

            </View>
            {
                loding ? <Loader /> : null
            }
        </View>
    )
}


export default DoctorsList

const styles = StyleSheet.create({
    block: { marginVertical: 5 },
    background: { backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2, padding: 10 },
    content: { padding: 10 },
    pressable: { padding: 5 }
})