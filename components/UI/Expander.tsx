import React, { useCallback, useEffect, useState } from 'react';

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { CText } from '@/components/CText';
import { useAnimationRotate } from '@/components/Common/Animation/useAnimationRotate';

import { FONTS } from '@/types';

type Props = {
  children: React.ReactNode;
  title: string;
  style?: ViewStyle;
  defaultState?: boolean;
};

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const CLOSED_STATE = {
  height: 0,
  translateX: -SCREEN_WIDTH,
  opacity: 0,
};

const OPENED_STATE = {
  height: undefined,
  translateX: 0,
  opacity: 1,
};

const DURATION = 150;

export const Expander: React.FC<Props> = ({
  children,
  title,
  style,
  defaultState = false,
}) => {
  const { styles: rotateAStyles, update: updateRotate } = useAnimationRotate(
    defaultState ? 45 : -45
  );
  const [isOpened, setIsOpened] = useState(defaultState);

  const actualAState = isOpened ? OPENED_STATE : CLOSED_STATE;

  const aHeight = useSharedValue(actualAState.height);
  const aTranslateX = useSharedValue(actualAState.translateX);
  const aOpacity = useSharedValue(actualAState.opacity);

  const aChildrenStyles = useAnimatedStyle(() => {
    return {
      height: aHeight.value,
      transform: [
        {
          translateX: aTranslateX.value,
        },
      ],
      opacity: aOpacity.value,
    };
  });

  const updateATransitions = () => {
    if (isOpened) {
      aHeight.value = OPENED_STATE.height;
      aTranslateX.value = withTiming(OPENED_STATE.translateX, {
        duration: DURATION,
      });
      aOpacity.value = withTiming(OPENED_STATE.opacity, {
        duration: DURATION * 2,
      });
    } else {
      aOpacity.value = withTiming(CLOSED_STATE.opacity, {
        duration: DURATION * 2,
      });
      aTranslateX.value = withTiming(CLOSED_STATE.translateX, {
        duration: DURATION,
      });
      aHeight.value = withDelay(
        DURATION,
        withTiming(CLOSED_STATE.height, { duration: 0 })
      );
    }
  };

  const toggleExpand = useCallback(() => {
    updateRotate(isOpened ? -45 : 45);
    setIsOpened(!isOpened);
  }, [isOpened]);

  useEffect(() => {
    updateATransitions();
  }, [isOpened]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.top}
        activeOpacity={1}
        onPress={toggleExpand}
      >
        <CText style={styles.title}>{title}</CText>
        <Animated.View style={[styles.trigger, rotateAStyles]} />
      </TouchableOpacity>
      <Animated.View style={[isOpened && styles.children, aChildrenStyles]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 15,
  },
  title: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
  },
  trigger: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRightColor: 'white',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    marginRight: 20,
  },
  children: {
    paddingBottom: 15,
  },
  testChildren: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
  },
});
