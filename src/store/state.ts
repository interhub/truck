import {START} from "./screenNames";

export default {
    //открытие меню
    menu: false,
    //экран приложения
    screen: START,
    //loader
    loader: true,
    //данные юзера для заказа храняться пока не изменятся
    user: {
        name: '',
        phone: '',
        info: ''
    },
    //данные для заказа храняться пока не закажет
    order: {
        car: false,
        boldCar: false,
        people: false,
        numPeople: 1,
        oblast: false,
        way: 0,
        material: false,
        address: [''],
        date: '',
        time: '',
    },
    //скидка
    sale: 0,
    //заказы
    orders: [],

    token: ''
};
