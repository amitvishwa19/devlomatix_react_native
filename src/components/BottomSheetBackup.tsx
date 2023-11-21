import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming, } from 'react-native-reanimated';
import PageBackground from './PageBackground';
import { appConfig } from '../utils/config';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;

type BottomSheetProps = {
    children: React.ReactNode;
};

export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;
};

const BottomSheetBackup = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(({ children }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const [shows, setShows] = useState(false)

    useEffect(() => {

        //showBottomSheet();
        // onClick(()=>{

        // })
    }, [])



    const scrollTo = useCallback((destination: number) => {
        'worklet';
        //active.value = destination !== 0;
        translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
        return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
        scrollTo,
        isActive,
    ]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
        })
        .onEnd(() => {
            if (translateY.value > -SCREEN_HEIGHT / 3) {
                scrollTo(0);
            } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
                scrollTo(MAX_TRANSLATE_Y);
            }
        });

    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [25, 10],
            Extrapolate.CLAMP
        );

        return {
            borderRadius,
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle, styles.backgeound]}>
                <PageBackground />
                <View style={styles.line} />
                <Animated.View style={[{height:'100%',width:'100%',backgroundColor:'#fff',opacity:0.2,borderRadius:10}]}></Animated.View>
                
                <View>
                    {children}
                </View>
            </Animated.View>
        </GestureDetector>
    );
}
);

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 0,
        overflow:'hidden'
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    },
    backgeound: {
        backgroundColor: appConfig.colors.primaryColor
    }
});

export default BottomSheetBackup;