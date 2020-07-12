// import React, {useEffect, useState, useRef} from 'react';
// import {View, Text, StyleSheet, BackHandler, TextInput, ScrollView, TouchableOpacity} from 'react-native';
// import {connect} from 'react-redux';
// import {SetScreen, SetLoader} from '../store/actions';
// import OrderCar from './OrderCar';
// import OrderPeople from './OrderPeople';
// import getSum from '../comps/getSum';
//
// const Orders = (props: any) => {
//
//   return <View>
//     <View style={{position: 'absolute', top: 10, right: 20, zIndex: 5000, flex:5}}>
//       <Text style={{fontSize: 20, color: '#fff'}}>{getSum(props.order)}₽</Text>
//     </View>
//     {/*<OrderCar/>*/}
//     <OrderPeople/>
//   </View>;
// };
//
// const mstp = (state: any) => {
//   return {
//     // menu: state.menu
//     user: state.user,
//     order: state.order
//   };
// };
//
// const mdtp = (dispatch: any) => {
//   return {
//     SetScreen: (screen: string) => dispatch(SetScreen(screen)),
//     SetLoader: (show: boolean) => dispatch(SetLoader(show))
//   };
// };
//
// const ConnectOrders = connect(mstp, mdtp)(Orders);
//
// export default ConnectOrders;
//
