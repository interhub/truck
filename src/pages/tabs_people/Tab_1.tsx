import React, { useEffect, useState } from 'react'
import { AsyncStorage, View, Text, StyleSheet, BackHandler, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, LayoutAnimation } from 'react-native'
import { START } from '../../store/screenNames'
import { connect } from 'react-redux';
import { SetScreen, SetLoader } from '../../store/actions';
import { Rating, AirbnbRating, Button, Input } from 'react-native-elements';
import MyIcon from '../../comps/MyIcon';
import { SetUser } from '../../store/actions';

const Tab_1 = (props: any) => {

    const setUser = (param: string, val: string) => {
        if (props.user.hasOwnProperty(param)) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            props.SetUser({ ...props.user, [param]: val })
            AsyncStorage.setItem('user', JSON.stringify(props.user))
        } else {
            console.log(props.user, 'ERROR PROPERTY SET')
        }
    }

    return <View style={styles.back} >
        <View style={{ flex: 2, backgroundColor: '#C4C4C4', margin: 10 }} >
            <View style={{ flex: 1, alignItems: 'flex-end', padding: 10 }}>
                <Text style={styles.boldText}>
                    контакты
                </Text>
            </View>
            {/* NAME  */}
            <View style={{ flex: 2, alignItems: 'flex-end' }}>
                <View style={{ backgroundColor: '#383838', height: '100%', width: '80%' }}>
                    <Input
                        label={props.user.name === '' ? '' : 'Имя'}
                        value={props.user.name} onChangeText={(val) => {
                            setUser('name', val)
                        }} inputStyle={{ color: '#fff' }} placeholder={'Имя *'} placeholderTextColor={'#999'} />
                </View>
            </View>
            <View style={{ flex: 2 }}></View>
            {/* PHONE  */}
            <View style={{ flex: 2, alignItems: 'flex-start' }}>
                <View style={{ backgroundColor: '#383838', height: '100%', width: '80%' }}>
                    <Input
                        label={props.user.phone === '' ? '' : 'Телефон'}
                        value={props.user.phone} onChangeText={(val) => {
                            setUser('phone', val)
                        }} inputStyle={{ color: '#fff' }} placeholder={'Телефон *'} placeholderTextColor={'#999'} />
                </View>
            </View>
            <View style={{ flex: 2 }}></View>
            {/* DOP DATA  */}
            <View style={{ flex: 2, alignItems: 'flex-end' }}>
                <View style={{ backgroundColor: '#383838', height: '100%', width: '80%' }}>
                    <Input
                        label={props.user.info === '' ? '' : 'Доп. информация'}
                        value={props.user.info} onChangeText={(val) => {
                            setUser('info', val)
                        }} inputStyle={{ color: '#fff' }} placeholder={'Доп. информация'} placeholderTextColor={'#999'} />
                </View>
            </View>
            <View style={{ flex: 3 }}></View>
        </View>

        {/* back handler  */}
        <TouchableOpacity
            style={{ position: 'absolute', bottom: 20, left: 20 }}
            onPress={() => { props.setTab(0) }}>
            <MyIcon source={require('../../img/back.png')} size={60} />
        </TouchableOpacity>
        {/* ok handler  */}
        {props.user.name !== '' && props.user.phone !== '' && <TouchableOpacity
            style={{ position: 'absolute', bottom: 20, right: 20 }}
            onPress={() => { props.setTab(0) }}>
            <MyIcon source={require('../../img/ok.png')} size={50} color={'#00A110'} />
        </TouchableOpacity>}
    </View>
}



const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: '#383838',
    },
    bg: {
        backgroundColor: '#C4C4C4',
        margin: 5,
        padding: 5
    },
    boldText: {
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    boldNum: {
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});

const mstp = (state: any) => {
    return {
        // menu: state.menu
        user: state.user
    };
};

const mdtp = (dispatch: any) => {
    return {
        SetScreen: (screen: string) => dispatch(SetScreen(screen)),
        SetLoader: (show: boolean) => dispatch(SetLoader(show)),
        SetUser: (user: object) => dispatch(SetUser(user))
    };
};

const ConnectTab_1 = connect(mstp, mdtp)(Tab_1);

export default ConnectTab_1

