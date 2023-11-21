import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import PageBackground from '../../components/PageBackground';
import { globalStyles } from '../../utils/styles';


type DocumentsScreenProp = NativeStackScreenProps<RootStackParamList, 'DocumentsScreen'>;
const DocumentsScreen = ({ navigation }: any) => {
  return (
    <View style={[globalStyles.page_container, globalStyles.main_screen_container]} >
      <PageBackground />
      <View>
        <Text>Document Screen</Text>
      </View>
    </View>
  )
}

export default DocumentsScreen

const styles = StyleSheet.create({})