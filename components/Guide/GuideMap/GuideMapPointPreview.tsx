import React, { useEffect, useState } from 'react';

import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

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

import { observer } from 'mobx-react-lite';

import { BackButton } from '@/Layouts/MainLayout/components/BackButton';
import { AudioContainer } from '@/components/Audio';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { CText } from '@/components/CText';
import { GuideMapPointActions } from '@/components/Guide/GuideMap/GuideMapPointActions';
import { PointListSmall } from '@/components/Point';
import { PullTrigger } from '@/components/UI/PullTrigger';

import { FONTS, Place } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  point: Place;
  onPointChange: (point: Place) => void;
  onOpenGallery: () => void;
  toggleHideHeader: (value?: boolean) => void;
  points: Place[];
};

const INITIAL_GENERIC_HEIGHT = 250;
export const MAX_PREVIEW_SWIPE_TOP = 50;
export const PREVIEW_INITIAL_HEIGHT =
  Platform.OS === 'ios'
    ? INITIAL_GENERIC_HEIGHT + CONSTANTS.spaces.iosAdditionalSpaceBottom
    : INITIAL_GENERIC_HEIGHT;

const GuideMapPointPreview = ({
  point,
  onOpenGallery,
  onPointChange,
  points,
  toggleHideHeader,
}: Props) => {
  const windowHeight = Dimensions.get('window').height;
  const openedTopValue = windowHeight - PREVIEW_INITIAL_HEIGHT;

  const [stateIsOpened, setStateIsOpened] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  const isOpened = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    if (!isOpened.value) {
      return {
        top: withTiming(openedTopValue, {
          duration: 150,
        }),
      };
    }

    return {
      top: withTiming(MAX_PREVIEW_SWIPE_TOP, {
        duration: 150,
      }),
    };
  });

  const handleClose = () => {
    isOpened.value = false;

    setTimeout(() => {
      setStateIsOpened(false);
    });
  };

  const handleOpen = () => {
    isOpened.value = true;

    setTimeout(() => {
      setStateIsOpened(true);
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

  useEffect(() => {
    toggleHideHeader(stateIsOpened);
  }, [stateIsOpened]);

  return (
    <Animated.View
      style={[styles.animatedContainer, animatedStyles]}
      onLayout={e => {
        setContainerHeight(e.nativeEvent.layout.height);
      }}
    >
      <BackgroundGradient style={[styles.wrapper]}>
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <View>
              <PullTrigger style={styles.swipeTrigger} />
              <BackButton transparent>
                <CText style={styles.pointTitle} numberOfLines={1} light>
                  {point.title}
                </CText>
              </BackButton>
            </View>
          </GestureDetector>
        </GestureHandlerRootView>

        <View style={styles.content}>
          <PointListSmall
            points={points}
            chosenPointId={point._id}
            onPointChange={onPointChange}
            isBig={stateIsOpened}
          />

          <View style={styles.actions}>
            <GuideMapPointActions point={point} onOpenGallery={onOpenGallery} />
          </View>

          {stateIsOpened && (
            <>
              {!!point.audioStory && (
                <AudioContainer
                  audioUrl={point.audioStory}
                  title={point.title}
                  checkTitles
                  defaultOpenState={true}
                />
              )}

              <ScrollView
                style={[
                  styles.descriptionContainer,
                  { height: containerHeight - 350 },
                ]}
                contentContainerStyle={styles.descriptionContent}
              >
                <CText style={styles.description} light>
                  {point.story}
                </CText>
              </ScrollView>
            </>
          )}
        </View>
      </BackgroundGradient>
    </Animated.View>
  );
};

export default observer(GuideMapPointPreview);

const styles = StyleSheet.create({
  animatedContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
  },
  wrapper: {
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    flex: 1,
  },
  swipeTrigger: {
    paddingTop: 10,
  },
  pointTitle: {
    fontFamily: FONTS.OpenSansSemiBold,
    fontSize: 20,
    textTransform: 'uppercase',
    width: '90%',
  },
  descriptionContainer: {},
  descriptionContent: {
    paddingBottom: 0,
  },
  description: {
    lineHeight: 20,
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
});
