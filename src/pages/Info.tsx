import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Platform,
  UIManager,
  BackHandler
} from 'react-native';

import {Divider, ListItem, Text} from 'react-native-elements';
import {Linking} from 'react-native';
import {connect, Provider} from 'react-redux';
import store from '../store/store';

import {SetMenu, SetScreen} from '../store/actions';
import {INFO, START} from '../store/screenNames';
import HeaderNav from '../comps/HeaderNav';
import PhotoSlider from '../comps/PhotoSllider';
import MyIcon from '../comps/MyIcon';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const phones = ['89062380631', '391601', '89218518240'];

const Info = (props: any) => {
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

  return (
    <View style={styles.back}>
      <HeaderNav title={'информация'}/>
      <ScrollView style={{flex: 1}}>
        {phones.map((el, i) => {
          return <ListItem
            onPress={() => {
              Linking.openURL(`tel:${el}`);
            }}
            key={i}
            title={el}
            leftIcon={{name: 'phone'}}
            bottomDivider
            chevron
          />;
        })}
        <View style={{marginTop: 20}}>
          <PhotoSlider/>
        </View>


        {/* 1 block  */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          padding: 20
        }}>
          <MyIcon source={require('../img/truck_icon.png')} size={35}/>
          <View>
            <Text style={{fontSize: 18, color: '#fff', padding: 5}}>
              Моментальное реагирование на заказ.
            </Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Divider/>
        </View>
        {/* 2 block  */}

        {/*скидка */}

        {/*<View style={{*/}
        {/*  flexDirection: 'row',*/}
        {/*  justifyContent: 'space-between',*/}
        {/*  width: '100%',*/}
        {/*  alignItems: 'center',*/}
        {/*  padding: 20*/}
        {/*}}>*/}
        {/*  <MyIcon source={require('../img/sale_icon.png')} size={35}/>*/}
        {/*  <View>*/}
        {/*    <Text style={{ fontSize: 18, color: '#fff', padding: 5 }}>*/}
        {/*        При заказе машины через приложение - скидка 5%.*/}
        {/*    </Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
        {/*<View style={{padding: 20}}>*/}
        {/*  <Divider/>*/}
        {/*</View>*/}
        {/* 3 block  */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          padding: 20
        }}>
          <MyIcon source={require('../img/ticket_icon.png')} size={35}/>
          <View>
            <Text style={{fontSize: 18, color: '#fff', padding: 5, marginHorizontal: 10}}>
              Постоянным клиентам полагается скидочный промокод .
            </Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Divider/>
        </View>
        {/* 0 block  */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          padding: 20
        }}>
          <MyIcon source={require('../img/important.png')} size={35}/>
          <View>
            <Text style={{fontSize: 18, color: '#fff', padding: 5}}>
              Минимальое время оплаты машины и грузчиков - 2 часа.
            </Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Divider/>
        </View>
        {/* litle car  */}
        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          padding: 20
        }}>
          <MyIcon source={require('../img/truck_stop.png')} size={35}/>
          <View>
            <Text style={{fontSize: 18, color: '#fff', padding: 5}}>
              Средняя машина - 500 ₽/час.
            </Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Divider/>
        </View>
        {/* big car  */}
        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          padding: 20
        }}>
          <MyIcon source={require('../img/truck_stop.png')} size={55}/>
          <View>
            <Text style={{fontSize: 18, color: '#fff', padding: 5}}>
              Большая машина - 600 ₽/час.
            </Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Divider/>
        </View>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          padding: 20
        }}>
          <View>
            <Text style={{fontSize: 18, color: '#fff', padding: 5}}>
              Стоимость доставки по области и услуг грузчиков расчитывается при заказе. Проезд грузчиков к месту работ
              входит в стоимость. Минимальная сумма заказа доступна в момент заказа. Итоговая стоимость услуг грузчиков
              и машины расчитывается исходя из времени работы: Грузчики - 300₽/час. При работе со строительными
              материалами 350 ₽/час.
            </Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Divider/>
        </View>
        <Text style={{fontSize: 18, color: '#fff', padding: 5}}>
          Грузоперевозки, квартирные офисные переезды-город, область, Европа. Вывоз утилизация мебели техники. Работаем
          без выходных. Опытные аккуратные грузчики. Сборка, разборка,упаковка мебели (упаковочные материалы за отд.
          плату). Входит 2-3х комнатная квартира. Холодильники любого размера перевозим вертикально. Перемещение пианино
          в пространстве. Возможна доставка грузов 6 метров длинной.
        </Text>
        <View style={{padding: 20}}>
          <Divider/>
        </View>


        <Text style={{
          fontSize: 15,
          color: '#fff',
          padding: 5,
          textAlign: 'center',
          marginTop: 50,
          backgroundColor: '#5c475f'
        }}>
          Калининградская область, Калининград, Ленинский пр-т, 83А
          р-н Московский
        </Text>

      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  back: {
    flex: 1,
    backgroundColor: '#383838'
  }
});

const mstp = (state: any) => {
  return {
    menu: state.menu
  };
};
const mdtp = (dispatch: any) => {
  return {
    SetMenu: (bool: boolean) => dispatch(SetMenu(bool)),
    SetScreen: (screen: string) => dispatch(SetScreen(screen))
  };
};

const ConnectInfo = connect(mstp, mdtp)(Info);


export default ConnectInfo;
