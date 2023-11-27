import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import PageBackground from '../../components/PageBackground'
import { HapticFeedback } from '../../utils/functions'
import { globalStyles } from '../../utils/styles'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { appConfig } from '../../utils/config'

const GuideScreen = ({ navigation }: any) => {
  return (
    <View style={[globalStyles.page_container]} >
      <PageBackground />

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
        <View style={{ height: appConfig.size.pressableTopIcon, width: '70%', justifyContent: 'center', alignItems:'center'}}>
          <Text style={{color:'#fff',fontSize:18}}>Guide</Text>
        </View>
        <Pressable onPress={() => { }}>
          <View style={{ height: appConfig.size.pressableTopIcon, width: appConfig.size.pressableTopIcon, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
            <View style={{}}>
              <IonIcon name="add" size={24} color="#fff" />
            </View>
          </View>
        </Pressable>
      </View>

      <View style={{flex:1,marginVertical:5}}>
        <Text>Guide Screen</Text>
      </View>
    </View>
  )
}

export default GuideScreen

const styles = StyleSheet.create({})