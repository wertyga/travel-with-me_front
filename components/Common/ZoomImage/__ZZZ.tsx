import React, { useRef, useState } from 'react';

import { ActivityIndicator, Dimensions, Image } from 'react-native';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// import styles from './styles';

const clamp = (value, min, max) => {
  'worklet';

  return Math.min(Math.max(min, value), max);
};

const noop = () => {};

const getDeviceWidth = () => {
  return Dimensions.get('window').width;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function ImageZoom({
  uri = '',
  minScale = 1,
  maxScale = 5,
  minPanPointers = 2,
  maxPanPointers = 2,
  isPanEnabled = true,
  isPinchEnabled = true,
  onLoadEnd = noop,
  onInteractionStart = noop,
  onInteractionEnd = noop,
  onPinchStart = noop,
  onPinchEnd = noop,
  onPanStart = noop,
  onPanEnd = noop,
  onLongPressActiveInteration = noop,
  onLongPressEndInteration = noop,
  onSwipeTapForNext = noop,
  onSwipeTapForPrev = noop,
  style = {},
  containerStyle = {},
  imageContainerStyle = {},
  activityIndicatorProps = {},
  renderLoader,
  resizeMode = 'cover',
  ...props
}) {
  const panRef = useRef();
  const pinchRef = useRef();

  const isInteracting = useRef(false);
  const isPanning = useRef(false);
  const isPinching = useRef(false);
  const doubleTapRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    canInteract: false,
    centerX: 0,
    centerY: 0,
  });

  const { canInteract, centerX, centerY } = state;

  const scale = useSharedValue(1);
  const initialFocalX = useSharedValue(0);
  const initialFocalY = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onInteractionStarted = () => {
    if (!isInteracting.current) {
      isInteracting.current = true;
      onInteractionStart();
    }
  };

  const onInteractionEnded = () => {
    if (isInteracting.current && !isPinching.current && !isPanning.current) {
      isInteracting.current = false;
      onInteractionEnd();
    }
  };

  const onPinchStarted = () => {
    onInteractionStarted();
    isPinching.current = true;
    onPinchStart();
  };

  const onPinchEnded = () => {
    isPinching.current = false;
    onPinchEnd();
    onInteractionEnded();
  };

  const onPanStarted = () => {
    onInteractionStarted();
    isPanning.current = true;
    onPanStart();
  };

  const onPanEnded = () => {
    isPanning.current = false;
    onPanEnd();
    onInteractionEnded();
  };

  const panHandler = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    });

  // useAnimatedGestureHandler({
  //   onActive: event => {
  //     translateX.value = event.translationX;
  //     translateY.value = event.translationY;
  //   },
  //   onFinish: () => {
  //     translateX.value = withTiming(0);
  //     translateY.value = withTiming(0);
  //   },
  // });

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
      scale.value = clamp(event.scale, minScale, maxScale);
      focalX.value = (centerX - initialFocalX.value) * (scale.value - 1);
      focalY.value = (centerY - initialFocalY.value) * (scale.value - 1);
    })
    .onEnd(() => {
      scale.value = withTiming(1);
      focalX.value = withTiming(0);
      focalY.value = withTiming(0);
      initialFocalX.value = 0;
      initialFocalY.value = 0;
    });

  //   useAnimatedGestureHandler({
  //   onStart: event => {
  //     initialFocalX.value = event.focalX;
  //     initialFocalY.value = event.focalY;
  //   },
  //   onActive: event => {
  //     // onStart: focalX & focalY result both to 0 on Android
  //     if (initialFocalX.value === 0 && initialFocalY.value === 0) {
  //       initialFocalX.value = event.focalX;
  //       initialFocalY.value = event.focalY;
  //     }
  //     scale.value = clamp(event.scale, minScale, maxScale);
  //     focalX.value = (centerX - initialFocalX.value) * (scale.value - 1);
  //     focalY.value = (centerY - initialFocalY.value) * (scale.value - 1);
  //   },
  //   onFinish: () => {
  //     scale.value = withTiming(1);
  //     focalX.value = withTiming(0);
  //     focalY.value = withTiming(0);
  //     initialFocalX.value = 0;
  //     initialFocalY.value = 0;
  //   },
  // });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { translateX: focalX.value },
      { translateY: focalY.value },
      { scale: scale.value },
    ],
  }));

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

  const onImageLoadEnd = () => {
    onLoadEnd();
    setIsLoading(false);
  };

  const onLongPress = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onLongPressActiveInteration();
    }
    if (
      event.nativeEvent.state === State.END ||
      event.nativeEvent.state === State.CANCELLED
    ) {
      onLongPressEndInteration();
    }
  };

  const onSingleTapEvent = event => {
    let e = event.nativeEvent;
    if (e.state === State.ACTIVE) {
      if (e.x < getDeviceWidth() / 2) {
        onSwipeTapForPrev();
      } else {
        onSwipeTapForNext();
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ width: 500, height: 500 }}>
      <GestureDetector
        ref={pinchRef}
        simultaneousHandlers={[panRef]}
        gesture={pinchHandler}
        onActivated={onPinchStarted}
        onCancelled={onPinchEnded}
        onEnded={onPinchEnded}
        onFailed={onPinchEnded}
        enabled={isPinchEnabled && canInteract}
      >
        <Animated.View style={[containerStyle]}>
          <GestureDetector
            ref={panRef}
            simultaneousHandlers={[pinchRef]}
            gesture={panHandler}
            onActivated={onPanStarted}
            onCancelled={onPanEnded}
            onEnded={onPanEnded}
            onFailed={onPanEnded}
            minPointers={minPanPointers}
            maxPointers={maxPanPointers}
            enabled={isPanEnabled && canInteract}
          >
            <Animated.View onLayout={onLayout} style={[imageContainerStyle]}>
              <TapGestureHandler
                waitFor={doubleTapRef}
                onHandlerStateChange={onSingleTapEvent}
              >
                <TapGestureHandler
                  ref={doubleTapRef}
                  onHandlerStateChange={() => null}
                  numberOfTaps={2}
                >
                  <LongPressGestureHandler
                    onHandlerStateChange={onLongPress}
                    minDurationMs={800}
                  >
                    <Animated.Image
                      style={[style, animatedStyle]}
                      source={{ uri }}
                      resizeMode={resizeMode}
                      onLoadEnd={onImageLoadEnd}
                      {...props}
                    />
                  </LongPressGestureHandler>
                </TapGestureHandler>
              </TapGestureHandler>
              {isLoading &&
                (renderLoader ? (
                  renderLoader()
                ) : (
                  <ActivityIndicator
                    size="large"
                    // style={styles.loader}
                    color="dimgrey"
                    {...activityIndicatorProps}
                  />
                ))}
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
