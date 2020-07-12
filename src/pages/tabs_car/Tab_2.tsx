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
  ActivityIndicator
} from 'react-native';
import {START} from '../../store/screenNames';
import {connect} from 'react-redux';
import {SetScreen, SetLoader, SetUser, SetOrder} from '../../store/actions';
import {Rating, AirbnbRating, Button, ListItem} from 'react-native-elements';
import MyIcon from '../../comps/MyIcon';
import location from '../../varibles/location';

import Item from './Item';

const Tab_2 = (props: any) => {

  useEffect(() => {
    GetFullAddress('калининград');
  }, []);

  // массив адресов для клика
  let [mass, setMass] = useState([]);
  let [load, setLoad] = useState(false);
  let ref: any = useRef(null);

  const SetAddress = (txt: any, num: number = props.order.address.length - 1) => {
    console.log(props.order.address, 'addresses');
    let items = [...props.order.address];
    items[num] = txt;
    props.SetOrder({...props.order, address: items});
    if (txt.length > 3) {
      GetFullAddress(txt);
    } else {
      GetFullAddress('калининград');
    }
  };
  const GetFullAddress = (txt: any) => {
    setLoad(true);
    fetch(location + '/address',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({txt})
      })
    .then((data) => data.json())
    .then((array) => {
      setMass(array.splice(0, 15));
      setLoad(false);
    })
    .catch((err) => {
      console.log(err, 'err adress');
      alert('Ошибка соединения');
      setLoad(false);
    });
  };

  return <View style={styles.back}>
    <View style={{flex: 1, backgroundColor: '#e6e6e6', margin: 10}}>
      <View>
        {props.order.address.map((item: any, num: number) => {
          return <Item key={num} num={num} SetAddress={SetAddress}/>;
        })}
      </View>
      <View style={{flex: 2}}>
        {!load && <ScrollView keyboardShouldPersistTaps={'handled'}>
          {mass.map((el: string, i: number) => {
            return <ListItem
              onPress={() => {
                SetAddress(el);
                setMass([]);
                // ref.current.focus()
              }}
              key={i}
              title={el}
              leftIcon={{name: 'room'}}
              bottomDivider
              chevron
            />;
          })}
        </ScrollView>}
        {load &&
        <View style={{flex: 1}}>
          <ActivityIndicator size={100} color="orange"/>
        </View>}
      </View>
      {/* <View style={{ flex: 1 }}></View> */}

    </View>
    {/* back handler  */}
    <TouchableOpacity
      style={{position: 'absolute', bottom: 20, left: 20}}
      onPress={() => {
        props.setTab(0);
      }}>
      <MyIcon source={require('../../img/back.png')} color={'#222'} size={60}/>
    </TouchableOpacity>
    {/* ok handler  */}
    {!props.order.address.some((el: any) => el == '') && <TouchableOpacity
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
    backgroundColor: '#e6e6e6',
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

const ConnectTab_2 = connect(mstp, mdtp)(Tab_2);

export default ConnectTab_2;

