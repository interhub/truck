import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  AsyncStorage
} from 'react-native';
import {START, ORDER_PEOPLE} from '../store/screenNames';
import {connect} from 'react-redux';
import {SetScreen, SetLoader, SetUser, SetOrder, SetSale, SetOrders} from '../store/actions';
import {Rating, AirbnbRating, Button, ListItem, Divider} from 'react-native-elements';
import MyIcon from '../comps/MyIcon';
import HeaderNav from '../comps/HeaderNav';
import {ORDER_CAR} from '../store/screenNames';
import AlertConnect from '../comps/AlertConnect';
import location from '../varibles/location';
import state from '../store/state';
import AlertSuccess from '../comps/AlertSuccess';
import getSum from '../comps/getSum';

const Tab_2 = (props: any) => {

  //возврат на главную
  const back = () => {
    props.SetScreen(props.order.car ? ORDER_CAR : ORDER_PEOPLE);
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

  const success = () => {
    props.SetLoader(false);
    AsyncStorage.setItem('orders', JSON.stringify([...props.orders, {...props.order}]))
    .then(() => {
      props.SetOrders([...props.orders, {...props.order}]);
      props.SetOrder({...state.order});
    });
    props.SetScreen(START);
    props.SetSale(0);
    AlertSuccess('Успешно', 'мы с вами свяжемся 🚚');
  };
  const fail = () => {
    props.SetLoader(false);
    AlertConnect(sendData);
  };

  const sendData = () => {
    props.SetLoader(true);
    //отправка данных на сервер user+order+обнуление
    fetch(location + '/order',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({order: {...props.order, sale: props.sale}, user: props.user})
      })
    .then((res) => res.json())
    .then((res) => {
      if (res.result === true)
        return success();
      throw new Error();
    })
    .catch((err) => {
      fail();
    });

  };

  return <View style={styles.back}>
    <HeaderNav title={'итоги'}/>
    <ScrollView style={{padding: 5}}>
      <Text style={styles.boldText}>Данные заказа:</Text>
      {props.order.car && <Text style={styles.dataText}>машина: {props.order.boldCar ? 'большая' : 'средняя'}</Text>}
      {props.order.people && <Text style={styles.dataText}>Грузчики: {props.order.numPeople} человек</Text>}
      {props.order.oblast && <Text style={styles.dataText}>Доставка за городом ~{props.order.way} км.</Text>}
      <Text style={{...styles.dataText, marginTop: 15}}>Адреса: </Text>
      {props.order.address.map((address: any, i: number) =>
        <Text key={i}
              style={styles.dataText}>{i + 1}. {address}. {i === 0 && '(адрес прибытия ' + (props.order.car ? 'машины)' : 'грузчиков)')} </Text>
      )}
      <Text style={{...styles.dataText, marginTop: 15}}>Ожидаемое время прибытия: </Text>
      <Text style={{...styles.dataText}}>{props.order.date} - {props.order.time} </Text>
      <Text style={{...styles.dataText, marginTop: 10, fontSize: 12}}>Минимальная стоимость заказа с учетом
        скидок: {getSum(props.order)}₽</Text>
      <Text style={{...styles.dataText, fontSize: 12}}>
        С вами свяжется диспетчер и уточнит все детали заказа.
      </Text>

      <Divider style={{margin: 20}}/>
      <Text style={styles.boldText}>Контактная информация:</Text>
      <Text style={styles.dataText}>Имя: {props.user.name}</Text>
      <Text style={styles.dataText}>Тел: {props.user.phone}</Text>
      {props.user.info !== '' && <Text style={styles.dataText}>Информация: {props.user.info}</Text>}

      {/* <Divider style={{ margin: 20 }} /> */}

      <View style={{width: '100%', height: 100}}></View>
    </ScrollView>
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', position: 'absolute', bottom: 20}}>
      <Button onPress={sendData} title={'Заказать'} containerStyle={{width: '50%'}}
              buttonStyle={{backgroundColor: 'orange', height: 50}}></Button>
    </View>
  </View>;
};


const styles = StyleSheet.create({
  back: {
    flex: 1,
    backgroundColor: '#383838'
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
    fontWeight: 'bold',
    marginVertical: 5
  },
  dataText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

const mstp = (state: any) => {
  return {
    user: state.user,
    order: state.order,
    sale: state.sale,
    orders: state.orders
  };
};

const mdtp = (dispatch: any) => {
  return {
    SetScreen: (screen: string) => dispatch(SetScreen(screen)),
    SetLoader: (show: boolean) => dispatch(SetLoader(show)),
    SetOrder: (order: object) => dispatch(SetOrder(order)),
    SetSale: (sale: number) => dispatch(SetSale(sale)),
    SetOrders: (orders: any) => dispatch(SetOrders(orders))
  };
};

const ConnectTab_2 = connect(mstp, mdtp)(Tab_2);

export default ConnectTab_2;

