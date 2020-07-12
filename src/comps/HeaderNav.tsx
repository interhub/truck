import React from 'react';
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import MyIcon from './MyIcon';
import { connect } from 'react-redux';
import { SetMenu } from '../store/actions';
import { H, W } from '../varibles/scale';

const HEADER_H = 50;

const HeaderNav = (props: any) => {
  return (
    <View
      style={{
        height: HEADER_H,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: W,
        paddingHorizontal: 10,
      }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          props.SetMenu(true);
          console.log(props, 'state header');
        }}>
        <View>
          <MyIcon size={40} source={require('../img/menu.png')} />
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            color: '#fff',
          }}>
          {props.title}
        </Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

const mstp = (state: any) => {
  return {
    menu: state.menu
  };
};
const mdtp = (dispatch: any) => {
  return {
    SetMenu: (bool: any) => dispatch(SetMenu(bool))
  };
};

const ConnectHeaderNav = connect(
  mstp,
  mdtp,
)(HeaderNav);

export default ConnectHeaderNav;
