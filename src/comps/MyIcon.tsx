import React from 'react'
import { TouchableHighlight, View, StyleSheet, Text, Image, TouchableNativeFeedback } from 'react-native';


const ICON_SIZE = 25

interface Props {
  active?: boolean,
  source: any,
  size?: any
  color?: string,
  activeColor?: string,
  onPress?: any
}

const MyIcon:React.FC<Props> = ({ active = false, source, size = ICON_SIZE, color, activeColor = '#fff', onPress = () => { } }) => {

  return (
    <Image
      resizeMode="contain"
      style={{
        height: size,
        width: size,
        tintColor: active ? activeColor : color
      }}
      source={source}></Image>
  )
}

export default MyIcon