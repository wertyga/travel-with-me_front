import React, { useRef, useState } from 'react';

import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';

import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type GestureUpFlingProps = {
  initialHeight: number;
  maxTop?: number;
  zIndex?: number;
  children: (
    Trigger: React.FC<{ style: ViewStyle; children?: React.ReactNode }>,
    isOpened: boolean
  ) => React.ReactNode;
  onOpen?: (isOpened: boolean) => void;
  style?: ViewStyle;
};

const { height: windowHeight } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('screen');

export const GestureUpFling: React.FC<GestureUpFlingProps> = ({
  children,
  initialHeight = 200,
  maxTop = 50,
  onOpen,
  style,
  zIndex,
}) => {
  const currentStateRef = useRef({
    initialTop: windowHeight - initialHeight,
    currentTop: windowHeight - initialHeight,
  });

  const [stateIsOpened, setStateIsOpened] = useState(false);

  const swipeTop = useSharedValue(currentStateRef.current.currentTop);
  const isOpened = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: swipeTop.value,
    };
  });

  const handleClose = () => {
    swipeTop.value = withTiming(currentStateRef.current.initialTop, {
      duration: 150,
    });
    isOpened.value = false;

    setTimeout(() => {
      setStateIsOpened(false);
      onOpen?.(false);
    });
  };

  const handleOpen = () => {
    swipeTop.value = withTiming(maxTop, {
      duration: 150,
    });
    isOpened.value = true;

    setTimeout(() => {
      setStateIsOpened(true);
      onOpen?.(true);
    });
  };

  const gesture = Gesture.Fling()
    .direction(Directions.UP | Directions.DOWN)
    .onEnd(() => {
      if (isOpened.value) {
        runOnJS(handleClose)();
      } else {
        runOnJS(handleOpen)();
      }
    });

  const Trigger: React.FC<{
    style?: ViewStyle;
    children?: React.ReactNode;
  }> = ({ style = {}, children }) => (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <View style={[styles.triggerWrapper, style]}>
          <View style={styles.trigger} />

          {children}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );

  return (
    <>
      <Animated.View
        style={[styles.container, animatedStyles, style, { zIndex }]}
      >
        {children(Trigger, stateIsOpened)}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  triggerWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  trigger: {
    height: 6,
    backgroundColor: 'white',
    borderRadius: 4,
    width: 150,
  },
});
