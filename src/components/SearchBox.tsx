import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { globalcolors } from '../utils/colors';
import { appConfig } from '../utils/config';

const SearchBox = () => {
    const [searchString, setSearchString] = useState('');


    return (
        <View style={styles.block}>
            <View style={{ height: 50, width: '100%', justifyContent: 'center', }}>
                <View style={{ backgroundColor: '#fff', position: 'absolute', height: '100%', width: '100%', borderRadius: 8, opacity: 0.2 }}></View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                    <View style={{ backgroundColor: 'transparent', width: '90%' }}>
                        <TextInput style={{ color: '#fff', fontSize: appConfig.size.fontSize}}
                            placeholder='Search Doctors, Categories,Topics'
                            placeholderTextColor={'#fff'}
                            value={searchString}
                            keyboardType='default'
                            onChange={event=> setSearchString(event.nativeEvent.text)}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Pressable onPress={()=>{console.log(searchString)}}>
                            <IonIcon name="search" size={20} color="#fff" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SearchBox

const styles = StyleSheet.create({
    block: { marginVertical: 5 }
})