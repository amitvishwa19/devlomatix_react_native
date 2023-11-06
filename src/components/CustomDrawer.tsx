import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'




const CustomDrawer = (props: any) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView contentContainerStyle={{ backgroundColor: 'orange' }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.bottom_container}>
        <TouchableOpacity>
          <View style={styles.bottom_container_item}>
            <Feather name="share-2" size={18} color="#003580" />
            <Text style={styles.item_text}>Logout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.bottom_container_item}>
            <Feather name="power" size={18} color="#003580" />
            <Text style={styles.item_text}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  item_text: {
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 10
  },
  bottom_container: {
    padding: 10,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    
  },
  bottom_container_item: {
    padding:10,
    flexDirection:'row',
    alignItems:'center',
   
  }
})