import React, { useEffect } from 'react';
import { View, StyleSheet, BackHandler, Text, ScrollView } from 'react-native';
import HeaderNav from '../comps/HeaderNav';
import { connect } from 'react-redux';
import { START } from './../store/screenNames';
import { SetScreen } from '../store/actions';


const List = (props: any) => {

    //возврат на главную
    const back = () => {
        props.SetScreen(START)
    }
    //обработчик возврат на главную
    useEffect(() => {
        //установка бек хендлера 
        const backAction = () => {
            back()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        console.log(props.orders, 'orders list')
    }, [])

    return (<View style={styles.back}>
        <HeaderNav title={'история заказов'} />
        <ScrollView>
            {props.orders && props.orders.map((el: any, i: any) => {
                return <View key={i} style={{ backgroundColor: '#c4c4c4', marginTop: 5 }}>
                    <View><Text>Дата {el.date} время {el.time}</Text></View>
                    <View><Text>Адреса: {el.address.join(' --> ')}</Text></View>
                </View>
            })}
        </ScrollView>
    </View>)
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: '#383838',
    },
    imageBox: {
        // flexDirection: 'column',
        flex: 1,
    },
});

const mstp = (state: any) => {
    return {
        menu: state.menu,
        screen: state.screen,
        loader: state.loader,
        orders: state.orders
    };
};
const mdtp = (dispatch: any) => {
    return {
        SetScreen: (screen: string) => dispatch(SetScreen(screen)),
    };
};
const ConnectList = connect(mstp, mdtp)(List);

export default ConnectList