import React from 'react';
import { View, ActivityIndicator } from "react-native"

const Loader = (props: any) => {

    return (<View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000, flex: 1, justifyContent: 'center', backgroundColor: '#383838' }} >
        <View >
            <ActivityIndicator size={100} color="orange" />
        </View>
    </View>)
}

export default Loader