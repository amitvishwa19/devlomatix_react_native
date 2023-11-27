import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { appConfig } from '../utils/config'
import BottomSheet, { BottomSheetRefProps } from './BottomSheetBackup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';


type propsType = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
const Features = ({navigation}:any) => {
    
    return (
        <View style={{marginVertical:5}}>
            <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
            <View style={{padding:5}}>
                <View style={{ flexDirection: 'row' ,justifyContent:'space-between',marginVertical:5}}>
                   
                     <Block title={appConfig.features.appointment.title} image={appConfig.features.appointment.image}
                        onClick={(() => {
                            navigation.navigate('AppointmentScreen')
                        })}
                    />
                   
                    <Block title={appConfig.features.question.title} image={appConfig.features.question.image}
                        onClick={(() => {
                            navigation.navigate('QuestionsScreen')
                        })}
                    />
                     <Block title={appConfig.features.records.title} image={appConfig.features.records.image}
                        onClick={(() => {
                            navigation.navigate('RecordsScreen')
                            
                        })}
                    />
                   
                    <Block title={appConfig.features.consultation.title} image={appConfig.features.consultation.image}
                        onClick={(() => {
                            navigation.navigate('ConsultationScreen')
                        })}
                    />
                </View>
                <View style={{ flexDirection: 'row' ,justifyContent:'space-between',marginVertical:5}}>
                    <Block title={appConfig.features.guide.title} image={appConfig.features.guide.image}
                        onClick={(() => {
                            navigation.navigate('GuideScreen')
                        })}
                    />
                    <Block title={appConfig.features.feeds.title} image={appConfig.features.feeds.image}
                        onClick={(() => {
                            navigation.navigate('FeedsScreen')
                        })}
                    />
                     <Block title={appConfig.features.reminder.title} image={appConfig.features.reminder.image}
                        onClick={(() => {
                            navigation.navigate('ReminderScreen')
                        })}
                    />
                   
                    <Block title={appConfig.features.care.title} image={appConfig.features.care.image}
                        onClick={(() => {
                            navigation.navigate('CareTeamScreen')
                        })}
                    />
                </View>
            </View>
            
        </View>
    )
}

type BlockProps = {
    title: string,
    image: any,
    onClick: any
}

const Block = ({ title, image, onClick }: BlockProps) => {
    return (
        <Pressable onPress={onClick}>
            <View style={styles.service}>
                <View style={{ backgroundColor: 'transparent', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
                <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={{ height: 40, width: 40, borderRadius: 8 }}>
                        <ImageBackground source={image} resizeMode="cover" style={{ height: '100%', width: '100%', borderRadius: 10 }} imageStyle={{ borderRadius: 8 }}>

                        </ImageBackground>
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default Features

const styles = StyleSheet.create({
    service: { height: 90, width: 90, justifyContent: 'center', alignItems: 'center'},
    title: { color: '#fff', marginTop: 5,fontSize:appConfig.size.fontSize}
})