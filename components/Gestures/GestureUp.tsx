import { useRef, useState } from 'react';

import { Dimensions, StyleSheet, View } from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { GesturesContainer } from './Gestures';

const ACTIVATE_THRESHOLD = 50;
const MAX_TOP = 50;
const FCKING_TRANSITION_LAG = 20;

export const GestureUp = ({
  children,
  initialHeight = 200,
  maxTop = MAX_TOP,
  activateThreshold = ACTIVATE_THRESHOLD,
}) => {
  const currentStateRef = useRef({
    initialTop: Dimensions.get('window').height - initialHeight,
    currentTop: Dimensions.get('window').height - initialHeight,
  });

  const swipeTop = useSharedValue(currentStateRef.current.currentTop);
  const isFinished = useSharedValue(false);
  const isOpened = useSharedValue(false);
  const canBeActivate = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: isFinished.value
        ? withTiming(swipeTop.value, { duration: 100 })
        : swipeTop.value,
    };
  });

  const handleClose = () => {
    swipeTop.value = currentStateRef.current.initialTop;
    isOpened.value = false;
  };

  const handleOpen = () => {
    swipeTop.value = maxTop;
    isOpened.value = true;
  };

  const onUpdate = e => {
    const distance = e.absoluteY + FCKING_TRANSITION_LAG;
    swipeTop.value = distance;

    const activation = isOpened.value
      ? distance - maxTop
      : currentStateRef.current.initialTop - distance;

    canBeActivate.value = activation > activateThreshold;
  };

  const onEnd = () => {
    if (!canBeActivate.value) {
      swipeTop.value = isOpened.value
        ? maxTop
        : currentStateRef.current.initialTop;
      return;
    }

    isFinished.value = true;

    if (isOpened.value) {
      runOnJS(handleClose)();
    } else {
      runOnJS(handleOpen)();
    }
  };

  const onStart = () => {
    isFinished.value = false;
  };

  const Trigger = ({ style = {} }) => (
    <GesturesContainer onUpdate={onUpdate} onEnd={onEnd} onStart={onStart}>
      <View style={[styles.triggerWrapper, style]}>
        <View style={styles.trigger} />
      </View>
    </GesturesContainer>
  );

  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 10,
          },
          animatedStyles,
        ]}
      >
        {children(Trigger)}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
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
