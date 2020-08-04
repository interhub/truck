import {createStore} from 'redux';
import {SET_LOADER, SET_MENU, SET_ORDER, SET_ORDERS, SET_SALE, SET_SCREEN, SET_TOKEN, SET_USER} from './actionNames';
import initialState from './state';

const reducer: any = (state: any, action: any) => {
    switch (action.type) {
        case SET_MENU:
            return {
                ...state, menu: action.menu
            };
        case SET_SCREEN:
            return {
                ...state, screen: action.screen
            };
        case SET_LOADER:
            return {
                ...state, loader: action.loader
            };
        case SET_ORDER:
            return {
                ...state, order: action.order
            };
        case SET_USER:
            return {
                ...state, user: action.user
            };
        case SET_SALE:
            return {
                ...state, sale: action.sale
            };
        case SET_ORDERS:
            return {
                ...state, orders: action.orders
            };
        case SET_TOKEN:
            return {
                ...state, token: action.token
            };

        default:
            return {...state}
    }
};

let store = createStore(reducer, initialState);

export default store;
