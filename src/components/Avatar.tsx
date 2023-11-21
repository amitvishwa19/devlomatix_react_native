import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Double } from 'react-native/Libraries/Types/CodegenTypes'
import { strings } from '../utils/strings'

type props = {
    image: string,
    size: Double,
    click:any
}

const Avatar = ({ image, size, click }: props) => {


    useEffect(() => {

        if (image == '') {
            console.log('no image')
        }



    }, [])


    return (
        <View style={{ height: size, width: size, backgroundColor: 'transparent', borderRadius: 50, overflow: 'hidden' }}>
            {
                image ?
                    <Pressable onPress={click}>
                        <ImageBackground
                            source={{ uri: image }}
                            resizeMode="cover"
                            style={{ height: '100%', width: '100%', borderRadius: 10 }}
                            imageStyle={{ borderRadius: 8 }}>
                        </ImageBackground>
                    </Pressable> :
                    <Pressable onPress={click}>
                        <ImageBackground
                            source={strings.appLogoPath}
                            resizeMode="cover"
                            style={{ height: '100%', width: '100%', borderRadius: 10 }}
                            imageStyle={{ borderRadius: 8 }}>
                        </ImageBackground>
                    </Pressable>

            }
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({})