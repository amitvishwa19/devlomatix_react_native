import { View, Text } from 'react-native'
import React from 'react'
import PageBackground from '../../components/PageBackground'
import { globalStyles } from '../../utils/styles'

const ProfileScreen = () => {
  return (
    <View style={[globalStyles.page_container]} >
      <PageBackground />
      <View style={[globalStyles.page_content]}>
       <Text>Profile</Text>
      </View>
    </View>
  )
}

export default ProfileScreen