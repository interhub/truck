

import React, { useRef } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Animated,
    useWindowDimensions,
    ImageBackground, Image
} from 'react-native';

import {  Text } from 'react-native-elements';

const images = [
    require("../img/photos/1.jpg"),
    require("../img/photos/2.jpg"),
    require("../img/photos/3.jpg"),
    require("../img/photos/4.jpg"),
    require("../img/photos/5.jpg"),
    require("../img/photos/6.jpg"),
];

const getTitle = (num: number) => {
    switch (num) {
        case 0: return 'Быстро и качесвтенно';
        case 1: return 'Вместительный салон';
        case 2: return 'Скидки клиентам';
        case 3: return 'Проверено временем';
        case 4: return 'Удобно заказывать';
        case 5: return 'Бережное обслуживание';

        default: return ''
    }
}

const PhotoSlider = (props: any) => {

    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();

    return (
        <View >
            {/* <Image source={require('../img/photos/1.jpg')} /> */}
            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal={true}
                    // style={styles.scrollViewStyle}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX
                                }
                            }
                        }
                    ], { useNativeDriver: false })}
                    scrollEventThrottle={1}
                >
                    {images.map((image, imageIndex) => {
                        return (
                            <View
                                style={{ width: windowWidth, height: 250 }}
                                key={imageIndex}>
                                <ImageBackground source={image} style={styles.card}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.infoText}>
                                            {getTitle(imageIndex)}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {images.map((image, imageIndex) => {
                        const width = scrollX.interpolate({
                            inputRange: [
                                windowWidth * (imageIndex - 1),
                                windowWidth * imageIndex,
                                windowWidth * (imageIndex + 1)
                            ],
                            outputRange: [8, 16, 8],
                            extrapolate: "clamp"
                        });
                        return (
                            <Animated.View
                                key={imageIndex}
                                style={[styles.normalDot, { width }]}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    scrollContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "flex-end",
        justifyContent: "flex-start"
    },
    textContainer: {
        backgroundColor: "rgba(0,0,0, 0.7)",
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
        margin: 5
    },
    infoText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});


export default PhotoSlider;