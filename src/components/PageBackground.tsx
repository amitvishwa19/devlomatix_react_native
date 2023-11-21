import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appcolors, strings } from '../utils/constants'
import { globalStyles } from '../utils/styles'




const { height, width } = Dimensions.get('window');
const PageBackground = () => {
    return (
        <ImageBackground source={strings.pageBackground} resizeMode="cover" style={styles.background_image_container}>
            <StatusBar
                animated={true}
                backgroundColor={appcolors.primaryColor}
                hidden={false}
            />
        </ImageBackground >
    )
}

export default PageBackground

const styles = StyleSheet.create({
    background_image_container: { flex: 1, padding: 10, position: 'absolute', height: height, width: width, opacity: 0.06 },
    background_image_container_image: { opacity: 0.9 }
})