import { Alert } from "react-native";

const AlertConnect = (callback:any) => Alert.alert(
    "Проверте соединение",
    "Возможно отсутсвует подключение к сети. Вы можете включить интернет и попробовать еще раз ♥",
    [
        {
            text: "Отправить повторно",
            onPress: () => callback(),
            style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }

    ],
    { cancelable: false }
);
export default AlertConnect
