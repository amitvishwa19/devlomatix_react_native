import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { MedicalServicesData } from '../utils/data'
import { strings } from '../utils/constants'
import { appConfig } from '../utils/config'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type HomeScreenProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
const Services = ({navigation}:any) => {
    //const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState('')
    return (
        <View style={styles.block}>
            <FlatList
                horizontal={true}
                //pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                data={MedicalServicesData}
                extraData={selectedId}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => {
                            navigation.navigate('DoctorsList')
                        }}>
                            <View style={styles.service}>
                                <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
                                <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                                    <View style={{ height: 40, width: 40, borderRadius: 8 }}>
                                        <ImageBackground source={item.image} resizeMode="cover" style={{ height: '100%', width: '100%', borderRadius: 10 }} imageStyle={{ borderRadius: 8 }}>

                                        </ImageBackground>
                                    </View>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                            </View>
                        </Pressable>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Services

const styles = StyleSheet.create({
    block: { marginVertical: 10, },
    service: { height: 80, width: 80, justifyContent: 'center', alignItems: 'center', marginRight: 10, },
    title: { color: '#fff', marginTop: 5, fontSize: appConfig.size.fontSize }
})