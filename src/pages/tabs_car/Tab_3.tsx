import React, {useEffect, useRef, useState} from 'react';
import {
  DatePickerAndroid,
  View,
  Text,
  StyleSheet,
  BackHandler,
  TextInput,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Switch,
  AsyncStorage
} from 'react-native';
import {START} from '../../store/screenNames';
import {connect} from 'react-redux';
import {SetScreen, SetLoader, SetOrder} from '../../store/actions';
import {Rating, AirbnbRating, Button, Divider, Slider, Input} from 'react-native-elements';
import MyIcon from '../../comps/MyIcon';
// import TextInputMask from 'react-native-text-input-mask';
import timePicker from 'react-native-24h-timepicker';
import dateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

const TimePicker: any = timePicker;
const DateTimePicker: any = dateTimePicker;

const Tab_3 = (props: any) => {

  const setOrderFunc = (param: string, val: any) => {
    if (props.order.hasOwnProperty(param)) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      props.SetOrder({...props.order, [param]: val});
      // AsyncStorage.setItem('user', JSON.stringify(props.user))
      console.log(props.order, 'NEW ORDER STATE SET');
    } else {
      console.log(props.order, 'ERROR PROPERTY SET');
    }
  };

  const picker: any = useRef();
  const [openDate, setOpenDate] = useState(false);

  return <View style={styles.back}>
    <TimePicker
      minuteInterval={5}
      textCancel={'Назад'}
      textConfirm={'Принять'}
      ref={picker}
      onCancel={() => picker.current.close()}
      onConfirm={(H: any, M: any): void => {
        setOrderFunc('time', `${H}:${M}`);
        picker.current.close();
      }
      }
    />
    {openDate && <DateTimePicker
      display={'calendar'}
      value={new Date()}
      mode={'date'}
      is24Hour={true}
      minimumDate={new Date()}
      onChange={(e: any) => {
        setOpenDate(false);
        // startEnd('start', e.nativeEvent.timestamp);
        setOrderFunc('date', moment(e.nativeEvent.timestamp).format('DD-MM-YYYY'))//new Date(e.nativeEvent.timestamp).toLocaleDateString());
      }}
    />}
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      style={{height: '100%'}}>
      {/* car type  */}
      <View style={{backgroundColor: '#C4C4C4', margin: 10}}>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          padding: 10
        }}>
          <View>
            <Text style={{fontSize: 20}}>
              Размер машины: {props.order.boldCar ? 'большая' : 'средняя'}
            </Text>
          </View>
          {/* ICON CONTAINER  */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginVertical: 15,
            alignItems: 'center'
          }}>
            <TouchableOpacity
              onPress={() => {
                setOrderFunc('boldCar', false);
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: props.order.boldCar ? undefined : '#00A110',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#00A110'
              }}>
              <MyIcon source={require('../../img/truck_stop.png')} size={35} color={'#222'}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOrderFunc('boldCar', true);
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 80,
                backgroundColor: !props.order.boldCar ? undefined : '#00A110',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#00A110'
              }}>
              <MyIcon source={require('../../img/truck_stop.png')} size={55} color={'#222'}/>
            </TouchableOpacity>
          </View>

          <Text style={{fontSize: 10, color: '#fff', padding: 5}}>
            *Подробнее о тарифах и технических характеристиках можно узнать в разделе "Информация" или по телефону в
            разделе меню.
          </Text>
        </View>
      </View>
      {/* OBLAST type  */}
      <View style={{backgroundColor: '#C4C4C4', margin: 10}}>
        <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, width: '70%', padding: 5}}>
              Перевозка за пределами города
            </Text>
            <Switch value={props.order.oblast} thumbColor={props.order.oblast ? '#00A110' : '#fff'}
                    onValueChange={() => {
                      setOrderFunc('oblast', !props.order.oblast);
                    }}/>
          </View>
          {props.order.oblast && <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Slider
              thumbTintColor={'green'}
              value={props.order.way}
              // step={5}
              style={{width: '90%'}}
              step={5}
              minimumValue={3}
              maximumValue={300}
              onValueChange={(val) => {
                console.log('val slider', val);
                setOrderFunc('way', val);
              }}
            />
            <Text style={{textAlign: 'center', fontSize: 20}}>Расстояние от места загрузки до места
              назначения: {props.order.way} км</Text>
          </View>}
        </View>
        <View style={{padding: 20}}>
          <Divider/>
        </View>
      </View>
      {/* info a PEOPLE */}
      <View style={{backgroundColor: '#C4C4C4', margin: 10}}>
        <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, width: '70%', padding: 5}}>
              Грузчики
            </Text>
            <Switch value={props.order.people} thumbColor={props.order.people ? '#00A110' : '#fff'}
                    onValueChange={() => {
                      setOrderFunc('people', !props.order.people);
                    }}/>
          </View>
          {props.order.people && <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Slider
              thumbTintColor={'green'}
              value={props.order.numPeople}
              // step={5}
              style={{width: '90%'}}
              step={1}
              minimumValue={1}
              maximumValue={20}
              onValueChange={(val) => {
                console.log('val slider', val);
                setOrderFunc('numPeople', val);
              }}
            />
            <Text style={{textAlign: 'center', fontSize: 20}}>Количесвто
              грузчиков: {props.order.numPeople} человек</Text>
          </View>}
        </View>
        <View style={{padding: 20}}>
          <Divider/>
        </View>
      </View>
      {/* info a MATERIAL */}
      <View style={{backgroundColor: '#C4C4C4', margin: 10}}>
        <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, width: '70%', padding: 5}}>
              Транспортировка строительных материалов
            </Text>
            <Switch value={props.order.material} thumbColor={props.order.material ? '#00A110' : '#fff'}
                    onValueChange={() => {
                      setOrderFunc('material', !props.order.material);
                    }}/>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Divider/>
        </View>
      </View>
      {/* info a DATE TIME */}
      <View style={{backgroundColor: '#C4C4C4', margin: 10}}>
        <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <View style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5
          }}>
            <Text style={{fontSize: 20, width: '50%', padding: 5}}>
              Дата*:
            </Text>

            <Text style={{fontSize: 20,textDecorationLine:'underline'}} onPress={() => setOpenDate(true)}>
              {props.order.date == '' ? 'Узказать дату' : props.order.date}
            </Text>

            {/*<TextInputMask*/}
            {/*  value={props.order.date}*/}
            {/*  onChangeText={(formatted: any, extracted: any) => {*/}
            {/*    setOrderFunc('date', formatted);*/}
            {/*  }}*/}
            {/*  underlineColorAndroid={'#222'}*/}
            {/*  style={{width: 80}}*/}
            {/*  placeholder={'00.00.0000'}*/}
            {/*  mask={'[00].[00].[0000]'}*/}
            {/*/>*/}
          </View>
          <View style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5
          }}>
            <Text style={{fontSize: 20, width: '50%', padding: 5}}>
              Время*:
            </Text>
            <Text style={{fontSize: 20,textDecorationLine:'underline'}} onPress={() => picker.current.open()}>
              {props.order.time == '' ? 'Указать время' : props.order.time}
            </Text>

          </View>

        </View>
        <View style={{padding: 20}}>
          <Divider/>
        </View>
      </View>
      {/* down box */}
      <View style={{marginBottom: 60}}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          padding: 20
        }}>
          <MyIcon source={require('../../img/important.png')} size={35}/>
          <View>
            <Text style={{fontSize: 18, color: '#fff', padding: 5}}>
              С вами свяжется диспетчер и уточнит все детали заказа.
            </Text>
          </View>
        </View>
        <View style={{padding: 20}}>
        </View>
      </View>
    </ScrollView>
    {/* back handler  */}
    <TouchableOpacity
      style={{position: 'absolute', bottom: 20, left: 20}}
      onPress={() => {
        props.setTab(0);
      }}>
      <MyIcon source={require('../../img/back.png')} size={60} color={'#111'}/>
    </TouchableOpacity>
    {/* ok handler  */}
    {props.order.date !== '' && props.order.time !== '' && <TouchableOpacity
      style={{position: 'absolute', bottom: 20, right: 20}}
      onPress={() => {
        props.setTab(0);
      }}>
      <MyIcon source={require('../../img/ok.png')} size={50} color={'#00A110'}/>
    </TouchableOpacity>}
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
    order: state.order
  };
};

const mdtp = (dispatch: any) => {
  return {
    SetScreen: (screen: string) => dispatch(SetScreen(screen)),
    SetLoader: (show: boolean) => dispatch(SetLoader(show)),
    SetOrder: (order: object) => dispatch(SetOrder(order))
  };
};

const ConnectTab_3 = connect(mstp, mdtp)(Tab_3);

export default ConnectTab_3;

