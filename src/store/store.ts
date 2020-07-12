import { createStore } from 'redux';
import { SET_MENU, SET_SCREEN, SET_LOADER, SET_ORDER, SET_USER, SET_SALE, SET_ORDERS } from './actionNames';
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

    default:
      return { ...state }
  }
};

let store = createStore(reducer, initialState);

export default store;
