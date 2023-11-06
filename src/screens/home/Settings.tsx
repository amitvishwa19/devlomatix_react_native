import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Styles from '../../utils/styles'
import { strings } from '../../utils/strings'
import { colors } from '../../utils/colors'

const Settings = () => {
  return (
    <View style={styles.root}>
    <StatusBar hidden={true} />
    <ImageBackground source={strings.pageBackground} resizeMode="cover" imageStyle={styles.image} style={styles.container}>
     
    </ImageBackground>
  </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', backgroundColor: colors.black, alignItems: 'center' },
  image: { opacity: 0.5, backgroundColor: colors.black },
})