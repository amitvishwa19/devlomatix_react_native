import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const { height: height, width: width } = Dimensions.get('window');


const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator color={"#fff"} size={60} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loader: { height: height, width: width, backgroundColor: '#000', opacity: 0.1, position: 'absolute', justifyContent: 'center', alignItems: 'center' }
})