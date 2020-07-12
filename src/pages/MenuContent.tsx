

import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Platform,
    UIManager,
    LayoutAnimation,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedbackComponent,
} from 'react-native';

import { Divider } from 'react-native-elements';

import { connect, Provider } from 'react-redux';
import store from '../store/store';

import StartScreen from '../pages/StartScreen'
import MyIcon from '../comps/MyIcon';
import { SetMenu, SetScreen } from '../store/actions';
import { INFO, START, FEED, CUP } from '../store/screenNames';

export const H = Dimensions.get('window').height;
export const W = Dimensions.get('window').width;

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


const MenuContent = (props: any) => {
    //основная функция открыти экрана 
    const openScreen = (nameScreen: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        props.SetScreen(nameScreen)
        props.SetMenu(false)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            {/* //текст меню */}

            <View style={{ flex: 5, alignItems: 'flex-end' }}>
                <View style={{ flex: 1, width: W - 50, padding: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            openScreen(START)
                        }} >
                        <Text
                            style={{
                                marginVertical: 20,
                                textAlign: 'left',
                                textTransform: 'uppercase',
                                color: '#fff',
                                fontSize: 22
                            }}>
                            меню
              </Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                        onPress={() => {
                            openScreen(INFO)
                        }} >
                        <Text

                            style={{
                                marginVertical: 20,
                                textAlign: 'left',
                                textTransform: 'uppercase',
                                color: '#fff',
                            }}>
                            информация и контакты
              </Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                        onPress={() => {
                            openScreen(FEED)
                        }} >
                        <Text
                            style={{
                                marginVertical: 20,
                                textAlign: 'left',
                                textTransform: 'uppercase',
                                color: '#fff',
                            }}>
                            обратная связь
              </Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                        onPress={() => {
                            openScreen(CUP)
                        }} >
                        <Text
                            style={{
                                marginVertical: 20,
                                textAlign: 'left',
                                textTransform: 'uppercase',
                                color: '#fff',
                            }}>
                            применить купон на скидку
              </Text>
                    </TouchableOpacity>
                    <Divider />
                    {/* <TouchableOpacity
                        onPress={() => {

                        }} >
                        <Text
                            style={{
                                marginVertical: 20,
                                textAlign: 'left',
                                textTransform: 'uppercase',
                                color: '#fff',
                            }}>
                            сменить цветовую тему
              </Text>
                    </TouchableOpacity>
                    <Divider /> */}

                </View>

            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                {/* стрелка */}
                <TouchableOpacity
                    onPressIn={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                        props.SetMenu(false);
                    }}
                    style={{ padding: 15 }}>
                    <MyIcon source={require('../img/back.png')} size={50} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const mstp = (state: any) => {
    return {
        menu: state.menu
    };
};
const mdtp = (dispatch: any) => {
    return {
        SetMenu: (bool: boolean) => dispatch(SetMenu(bool)),
        SetScreen: (screen: string) => dispatch(SetScreen(screen)),
    };
};

const ConnectMenuContent = connect(mstp, mdtp)(MenuContent);


export default ConnectMenuContent;