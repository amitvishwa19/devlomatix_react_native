import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Styles from '../../utils/styles'
import BottomNavigator from '../../navigation/BottomNavigator'

const Main = () => {
    return (
        <View style={{flex:1}}>
            <BottomNavigator/>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({})