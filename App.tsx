import React, {useEffect} from 'react';
import {
    AsyncStorage,
    Dimensions,
    LayoutAnimation,
    Platform, SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';

import {connect, Provider} from 'react-redux';
import store from './src/store/store';

import StartScreen from './src/pages/StartScreen';
import MenuContent from './src/pages/MenuContent';
import Info from './src/pages/Info';
import Feed from './src/pages/Feed';
import Cupon from './src/pages/Cupon';
import OrderCar from './src/pages/OrderCar';
import OrderPeople from './src/pages/OrderPeople';
import Itog from './src/pages/Itog';
import {SetMenu, SetOrders, SetSale, SetScreen, SetUser} from './src/store/actions';
import {CUP, FEED, INFO, ITOG, LIST, ORDER_CAR, ORDER_PEOPLE, START} from './src/store/screenNames';
import Loader from './src/comps/Loader';

import List from './src/pages/List';
import AddToken from "./src/comps/AddToken";
import * as SplashScreen from 'expo-splash-screen'

export const H = Dimensions.get('window').height;
export const W = Dimensions.get('window').width;


if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = (props: any) => {

    const setStart = () => {
        SplashScreen.preventAutoHideAsync()

        //функция установки данных из памяти телефона
        //данные заказа, если были введены но не заказаны
        //------в дальнейшем добавить цветовую тему -----

        //данные контактов пользователя
        AsyncStorage.getItem('user')
            .then((user: any) => {
                if (user != null) {
                    props.SetUser(JSON.parse(user));
                }
            });
        AsyncStorage.getItem('sale')
            .then((sale: any) => {
                if (sale != null) {
                    props.SetSale(sale);
                }
            });
        AsyncStorage.getItem('orders')
            .then((orders: any) => {
                if (orders != null) {
                    props.SetOrders(JSON.parse(orders));
                    console.log('ram orders,', orders);
                }
                SplashScreen.hideAsync()
            });

    };

    useEffect(() => {
        setStart();
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#383838'}}>
            <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{flex: 1, minHeight: H - 30}}>
                <AddToken/>
                <View style={{flex: 1}}>
                    <StatusBar backgroundColor={'#383838'}/>
                    {/* ЭКРАНЫ */}
                    {/* <KeyboardAvoidingView behavior='padding' contentContainerStyle={{ flex: 1 }} keyboardVerticalOffset={-300} style={{ flex: 1 }}> */}
                    {props.screen === START && <StartScreen/>}
                    {props.screen === INFO && <Info/>}
                    {props.screen === FEED && <Feed/>}
                    {props.screen === CUP && <Cupon/>}
                    {props.screen === ORDER_CAR && <OrderCar/>}
                    {props.screen === ORDER_PEOPLE && <OrderPeople/>}
                    {props.screen === ITOG && <Itog/>}
                    {props.screen === LIST && <List/>}

                    {/* правый закрыватель */}
                    {props.menu &&
                    <TouchableOpacity
                        style={{...styles.menu, right: 0, top: 0, backgroundColor: '#111', width: W, opacity: 0.2}}
                        onPressIn={() => {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                            props.SetMenu(false);
                        }}/>}
                    {/* меню бокс */}
                    <View
                        style={{
                            ...styles.menu,
                            right: !props.menu ? W + 100 : 50
                        }}
                    >
                        {/* //содержимое меню */}
                        <MenuContent/>
                    </View>
                    {/* loader  */}
                    {props.loader && <Loader/>}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        height: '100%',
        width: '130%',
        backgroundColor: '#808080',
        zIndex: 1000
    }
});


const mstp = (state: any) => {
    return {
        menu: state.menu,
        screen: state.screen,
        loader: state.loader
    };
};
const mdtp = (dispatch: any) => {
    return {
        SetMenu: (bool: boolean) => dispatch(SetMenu(bool)),
        SetScreen: (screen: string) => dispatch(SetScreen(screen)),
        SetUser: (user: object) => dispatch(SetUser(user)),
        SetSale: (sale: number) => dispatch(SetSale(sale)),
        SetOrders: (orders: any) => dispatch(SetOrders(orders))
    };
};
const ConnectApp = connect(mstp, mdtp)(App);

const ProviderApp: React.FC = () => {
    return (
        <Provider store={store}>
            <ConnectApp/>
        </Provider>

    );
};

export default ProviderApp;
