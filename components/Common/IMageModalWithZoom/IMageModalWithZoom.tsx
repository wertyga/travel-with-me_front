import * as React from 'react';

import { Dimensions, StyleSheet } from 'react-native';

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

import { ZoomImage } from '@/components/Common/ZoomImage/ZoomImage';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

type Props = {
  uri: string;
  onClose: () => void;
};

const ACTIVATE_TIMEOUT = 300; // Default for withTiming

export const IMageModalWithZoom = ({ uri, onClose }: Props) => {
  const translateY = useSharedValue(0);

  const handleClose = () => {
    setTimeout(onClose, ACTIVATE_TIMEOUT);
  };

  const panHandler = Gesture.Fling()
    .direction(Directions.UP)
    .numberOfPointers(1)
    .onEnd(e => {
      translateY.value = withTiming(-windowHeight);

      runOnJS(handleClose)();
    });

  const animatesStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panHandler}>
        <Animated.View style={[styles.content, animatesStyles]}>
          <ZoomImage uri={uri} imageStyle={styles.image} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  image: {
    width: windowWidth,
    objectFit: 'contain',
    height: windowHeight,
  },
});
