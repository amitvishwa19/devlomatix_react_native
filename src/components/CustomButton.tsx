import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { size } from '../utils/size';


type props = {
    title:string,
    backgroundColor:string,
    color:string,
    borderColor:string,
    onClick:any
    width:string
  };
const CustomBUtton = ({title, backgroundColor, color, borderColor,onClick,width}:props) => {
  return (
    <TouchableOpacity style={[{backgroundColor:backgroundColor, borderColor: borderColor ,width:width} ,styles.button]} onPress={onClick}>
      <Text style={[{color:color}, styles.button_text]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomBUtton

const styles = StyleSheet.create({
    button:{height:size.buttonHeight,justifyContent:'center',alignItems:'center',borderRadius:size.buttonBorderRadius,borderWidth:1},
    button_text:{fontSize:20,fontWeight:'bold',letterSpacing:0}
})