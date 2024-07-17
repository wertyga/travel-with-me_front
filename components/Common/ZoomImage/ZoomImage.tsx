import { useState } from 'react';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const ZoomImage = ({ uri, imageStyle }) => {
  const scale = useSharedValue(1);
  const initialFocalX = useSharedValue(0);
  const initialFocalY = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [state, setState] = useState({
    canInteract: false,
    centerX: 0,
    centerY: 0,
  });

  const onLayout = ({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }) => {
    setState(current => ({
      ...current,
      canInteract: true,
      centerX: x + width / 2,
      centerY: y + height / 2,
    }));
  };

  const pinchHandler = Gesture.Pinch()
    .onStart(event => {
      initialFocalX.value = event.focalX;
      initialFocalY.value = event.focalY;
    })
    .onUpdate(event => {
      // onStart: focalX & focalY result both to 0 on Android
      if (initialFocalX.value === 0 && initialFocalY.value === 0) {
        initialFocalX.value = event.focalX;
        initialFocalY.value = event.focalY;
      }
      scale.value = event.scale;
      focalX.value = (state.centerX - initialFocalX.value) * (scale.value - 1);
      focalY.value = (state.centerY - initialFocalY.value) * (scale.value - 1);
    })
    .onEnd(() => {
      scale.value = withTiming(1);
      focalX.value = withTiming(0);
      focalY.value = withTiming(0);
      initialFocalX.value = 0;
      initialFocalY.value = 0;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { translateX: focalX.value },
      { translateY: focalY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pinchHandler}>
        <Animated.View onLayout={onLayout}>
          <Animated.Image
            source={{ uri }}
            style={[imageStyle, animatedStyle]}
            resizeMode="contain"
          />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
