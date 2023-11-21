import { StyleSheet, Text, View } from 'react-native'
import React, { forwardRef } from 'react'



type BlockProp={
    children:React.ReactNode
}

const Block = forwardRef<BlockProp>(({children,ref}:any,) => {
    return (
      <View>
        {children}
      </View>
    )
  })

export default Block

const styles = StyleSheet.create({})