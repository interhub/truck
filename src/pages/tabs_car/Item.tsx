import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, BackHandler, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { START } from '../../store/screenNames'
import { connect } from 'react-redux';
import { SetScreen, SetLoader, SetUser, SetOrder } from '../../store/actions';
import { Rating, AirbnbRating, Button, ListItem, Divider, Input } from 'react-native-elements';
import MyIcon from '../../comps/MyIcon';

const Item = (props: any) => {
    const ref: any = useRef(null)

    const addItem = () => {
        if (props.order.address[props.order.address.length - 1] === '') {
            return ref.current.shake()
        }
        let items = [...props.order.address];
        props.SetOrder({
            ...props.order, address: [...items, '']
        })
    }
    const removeItem = () => {
        let items = [...props.order.address];
        items.splice(props.num, 1)
        props.SetOrder({
            ...props.order, address: [...items]
        })
    }

    return <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1, marginVertical: -12 }}  >
        <View style={{ flex: 1 }}>
            {props.num > 0 && < Button title={'-'} onPress={removeItem} />}
        </View> 
        <View style={{ flex: 6, marginTop: 15 }}>
            <Input autoCompleteType={'street-address'}
                placeholder={'Адрес ' + (props.num + 1) + (props.num === 0 ? ' Прибытие машины' : '')}
                ref={ref}
                inputStyle={{ fontSize: 15 }}
                style={{ marginHorizontal: 5, height: 20 }}
                // underlineColorAndroid={'#444'}
                value={props.order.address[props.num]}
                onChangeText={props.SetAddress} />
        </View>
        <View style={{ flex: 1 }} >
            {props.num === (props.order.address.length - 1) && <Button title={'+'} onPress={addItem} />}
        </View>
    </View>
}


const mstp = (state: any) => {
    return {
        // menu: state.menu
        order: state.order
    };
};

const mdtp = (dispatch: any) => {
    return {
        SetOrder: (order: object) => dispatch(SetOrder(order))
    };
};

const ConnectItem = connect(mstp, mdtp)(Item);

export default ConnectItem

