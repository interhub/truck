import React, {useEffect, useState} from 'react';
import {AsyncStorage, BackHandler, StyleSheet, View} from 'react-native';
import {START} from '../store/screenNames';
import HeaderNav from '../comps/HeaderNav';
import {connect} from 'react-redux';
import {SetSale, SetScreen} from '../store/actions';
import {Button, Input} from 'react-native-elements';
import AlertConnect from '../comps/AlertConnect';
import location from '../varibles/location';
import AlertSuccess from '../comps/AlertSuccess';

const Cupon = (props: any) => {
    let [text, setText] = useState('');
    const fail = () => {
        AlertConnect(sendData);
    };
    const sendData = async () => {
        await fetch(location + '/fire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: {
                text,
                token: props.token
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result === true) {
                    alert('Уведомления включены ☻')
                }
            })
        await fetch(location + '/cupon/' + text)
            .then((res) => res.json())
            .then((res) => {
                console.log(res, 'res cupon');
                if (res.result === true) {
                    props.SetSale(res.num);
                    AsyncStorage.setItem('sale', (res.num));
                    AlertSuccess('Успешно!', '-' + res.num + 'Р на следущий заказ ♥');
                    setText('');
                } else {
                    alert('не верно');
                }
            })
            .catch((err) => {
                console.log(err, 'errr cupon');
                fail();
            });

    };

    //возврат на главную
    const back = () => {
        props.SetScreen(START);
    };
    //обработчик возврат на главную
    useEffect(() => {
        //установка бек хендлера
        const backAction = () => {
            back();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, []);


    return <View style={styles.back}>
        <HeaderNav title={'Применить купон'}/>
        <View style={{backgroundColor: '#C4C4C4', flex: 1, justifyContent: 'center'}}>
            <Input
                value={text}
                onChangeText={(e: any) => setText(e)}
                containerStyle={{alignItems: 'center'}}
                inputContainerStyle={{width: '75%'}}
                inputStyle={{backgroundColor: '#808080', height: 60, color: '#fff'}}
                style={{backgroundColor: 'red'}}
            />
            <Button
                onPress={sendData}
                title={'Добавить промокод'}
                containerStyle={{alignItems: 'center'}}
                iconContainerStyle={{}}
                titleStyle={{color: 'black'}}
                buttonStyle={{width: '70%', height: 60, backgroundColor: '#FFEC45'}}/>
        </View>
        {/* Заглушка снизу */}
        <View style={{flex: 1}}>
        </View>
    </View>;
};


const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: '#383838'
    }
});

const mstp = (state: any) => {
    return {
        token: state.token
    };
};

const mdtp = (dispatch: any) => {
    return {
        SetScreen: (screen: string) => dispatch(SetScreen(screen)),
        SetSale: (sale: number) => dispatch(SetSale(sale))
    };
};

const ConnectCupon = connect(mstp, mdtp)(Cupon);


export default ConnectCupon;
