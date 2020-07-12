import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, BackHandler, TextInput, ScrollView, Alert} from 'react-native';
import {START} from '../store/screenNames';
import HeaderNav from '../comps/HeaderNav';
import {connect} from 'react-redux';
import {SetScreen, SetLoader} from '../store/actions';
import {Rating, AirbnbRating, Button} from 'react-native-elements';
import AlertConnect from '../comps/AlertConnect';
import location from '../varibles/location';

const FeedBack = (props: any) => {

  let [feed, setFeed] = useState({
    text: '',
    rating: 0
  });


  const setRating = (num: number) => {
    setFeed({...feed, rating: num});
  };
  const setText = (text: any) => {
    console.log(feed, 't');
    setFeed({...feed, text: text});
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

  const fail = () => {
    AlertConnect(sendData);
    props.SetLoader(false);
  };

  const sendData = () => {
    props.SetLoader(true);
    fetch(location + '/feed',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({rating: feed.rating, text: feed.text, name: props.user.name, phone: props.user.phone})
      })
    .then(() => {
      props.SetLoader(false);
      setFeed({
        text: '',
        rating: 0
      });
      props.SetScreen(START);
    })
    .catch((err) => {
      fail();
    });
  };


  return <ScrollView style={styles.back}>
    <HeaderNav title={'обратная связь'}/>
    <TextInput
      value={feed.text}
      placeholder={'Введите отзыв'}
      onChangeText={setText}
      multiline={true}
      numberOfLines={5}
      style={{height: 200, textAlignVertical: 'top', backgroundColor: '#808080', color: '#fff', fontSize: 25}}/>
    <View style={{marginVertical: 40}}>
      <AirbnbRating
        // showRating
        onFinishRating={setRating}
        defaultRating={feed.rating}
        count={5}
        reviews={['Плохо', 'Не очень', 'Норм', 'Хорошо', 'Отлично']}
      />
    </View>
    <View style={{}}>
      <Button onPress={() => {
        //обработка отправки данных
        sendData();
      }}
              disabled={(feed.text === '' && feed.rating === 0)}
              containerStyle={{alignItems: 'center'}}
              buttonStyle={{backgroundColor: '#FFEC45', width: '80%', height: 60}}
              titleStyle={{color: '#383838'}}
              title={'Отправить'}/>
    </View>
  </ScrollView>;
};


const styles = StyleSheet.create({
  back: {
    flex: 1,
    backgroundColor: '#383838'
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
    SetLoader: (show: boolean) => dispatch(SetLoader(show))
  };
};

const ConnectFeedBack = connect(mstp, mdtp)(FeedBack);


export default ConnectFeedBack;
