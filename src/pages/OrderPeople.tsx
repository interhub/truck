import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, BackHandler, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {START, ITOG} from '../store/screenNames';
import HeaderNav from '../comps/HeaderNav';
import {connect} from 'react-redux';
import {SetScreen, SetLoader} from '../store/actions';
import {Rating, AirbnbRating, Button, Input} from 'react-native-elements';
import MyIcon from '../comps/MyIcon';
import TabsPeople from './tabs_people/TabsPeople';
import getSum from '../comps/getSum';

const OrderProple = (props: any) => {
  let [tab, setTab] = useState(0);

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

  let ref: any = useRef(null);
  useEffect(() => {
    if (props.order.date !== '' && props.order.time !== '' && !props.order.address.some((el: any) => el == '') && props.user.name !== '' && props.user.phone !== '' && tab === 0) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.shake();
        }
      }, 200);
    }
  }, [tab]);

  return <View style={styles.back}>

    <HeaderNav title={'заказ'}/>
    {/*итговая стоимость*/}
    <View style={{position: 'absolute', top: 10, right: 20, zIndex: 5000, flex: 5}}>
      <Text style={{fontSize: 20, color: '#fff'}}>{getSum(props.order)}₽</Text>
    </View>
    {tab !== 0 && <TabsPeople tab={tab} setTab={setTab}/>}
    {tab == 0 && <View style={{flex: 1}}>
      {/* box 1  */}
      <TouchableOpacity
        onPress={() => {
          setTab(1);
        }}
        style={{...styles.bg, flex: 5, justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.boldNum}>I</Text>
          <Text style={styles.boldText}>контакты</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {props.user.name !== '' && props.user.phone !== '' &&
          <MyIcon source={require('../img/ok.png')} size={40} color={'#00A110'}/>}
        </View>
      </TouchableOpacity>
      {/* box 2  */}
      <TouchableOpacity
        onPress={() => {
          setTab(2);
        }}
        style={{...styles.bg, flex: 7, justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.boldNum}>II</Text>
          <Text style={styles.boldText}>адрес</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {!props.order.address.some((el: any) => el == '') &&
          <MyIcon source={require('../img/ok.png')} size={40} color={'#00A110'}/>}
        </View>
      </TouchableOpacity>
      {/* box 3  */}
      <TouchableOpacity
        onPress={() => {
          setTab(3);
        }}
        style={{...styles.bg, flex: 7, justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.boldNum}>III</Text>
          <Text style={styles.boldText}>комментарии</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {props.order.date !== '' && props.order.time !== '' &&
          <MyIcon source={require('../img/ok.png')} size={40} color={'#00A110'}/>}
        </View>
      </TouchableOpacity>
      {/* ITOG handler  */}
      {/* условие на возможность заказа  */}
      {props.order.date !== '' && props.order.time !== '' && !props.order.address.some((el: any) => el == '') && props.user.name !== '' && props.user.phone !== '' &&
      <View
        style={{position: 'absolute', bottom: 15, width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => props.SetScreen(ITOG)}>
          <Input
            ref={ref}
            disabled
            defaultValue={'Итог'}
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 12,
              borderColor: '#00A110',
              height: 50,
              paddingHorizontal: 10,
              width: 150,
              marginLeft: 0,
              backgroundColor: '#00A110',
              marginBottom: -10

            }}
            disabledInputStyle={{fontSize: 15, color: '#fff', opacity: 1}}
            inputStyle={{fontSize: 15, color: '#00A110', textAlign: 'center'}}
          />
        </TouchableOpacity>
      </View>}
    </View>}

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
    user: state.user,
    order: state.order
  };
};

const mdtp = (dispatch: any) => {
  return {
    SetScreen: (screen: string) => dispatch(SetScreen(screen)),
    SetLoader: (show: boolean) => dispatch(SetLoader(show))
  };
};

const ConnectOrderProple = connect(mstp, mdtp)(OrderProple);

export default ConnectOrderProple;

