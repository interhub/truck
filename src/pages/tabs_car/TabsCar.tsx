import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, BackHandler, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { START } from '../../store/screenNames'
import { connect } from 'react-redux';
import { SetScreen, SetLoader } from '../../store/actions';
import { Rating, AirbnbRating, Button } from 'react-native-elements';
import MyIcon from '../../comps/MyIcon';
import Tab_1 from './Tab_1'
import Tab_2 from './Tab_2'
import Tab_3 from './Tab_3'


const TabsCar = (props: any) => {
    
    //обработчик возврат на главную
    useEffect(() => {
        //установка бек хендлера 
        const backAction = () => {
            props.setTab(0)
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, []);
    
    return <View style={styles.back} >
        {props.tab===1 && <Tab_1 setTab={props.setTab} />}
        {props.tab===2 && <Tab_2 setTab={props.setTab} />}
        {props.tab===3 && <Tab_3 setTab={props.setTab} />}

    </View>
}



const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: '#383838',
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
    };
};

const mdtp = (dispatch: any) => {
    return {
        SetScreen: (screen: string) => dispatch(SetScreen(screen)),
        SetLoader: (show: boolean) => dispatch(SetLoader(show))
    };
};

const ConnectTabsCar = connect(mstp, mdtp)(TabsCar);

export default ConnectTabsCar

