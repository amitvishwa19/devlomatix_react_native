import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';


const { height: HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -HEIGHT;

type BottomSheetProps = {
  children: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheetBackup = forwardRef<BottomSheetRefProps, BottomSheetProps>(({ children }, ref) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const active = useSharedValue(false);

  useEffect(() => {
    //translateY.value = withSpring(-HEIGHT / 3, { damping: 50 })
  }, [])

  const isActive = useCallback(() => {
    return active.value;
  }, [])

  const scrollTo = useCallback((destination: number) => {
    'worklet';

    active.value = destination !== 0;

    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive])


  const gesture = Gesture.Pan()
    .onStart((event) => {
      context.value = { y: translateY.value };
    }).onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    }).onEnd(() => {
      if (translateY.value > -HEIGHT / 3) {
        scrollTo(0);
      } else if (translateY.value < -HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    })

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomsheet, bottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  )
})

export default BottomSheetBackup

const styles = StyleSheet.create({
  bottomsheet: {
    height: HEIGHT,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: HEIGHT,
    borderRadius: 10,
    marginBottom:50,
    bottom:20,
  },
  line: { width: 75, height: 4, backgroundColor: '#000', alignSelf: 'center', marginVertical: 15, borderRadius: 2, },
})