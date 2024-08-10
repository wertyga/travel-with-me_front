import React, { useEffect, useState } from 'react';

import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';

import { Slider } from 'react-native-awesome-slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { observer } from 'mobx-react-lite';

import { CloseIcon } from '@/components/Audio/CloseIcon';
import { CloseOpenIcon } from '@/components/Audio/CloseOpenIcon';
import { CText } from '@/components/CText';
import { PlaySoundIconButton } from '@/components/Common';
import { useStores } from '@/hooks';

import { secToTime } from '@/utils';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  withTitle?: boolean;
  withClose?: boolean;
  checkTitles?: boolean;
  absolute?: boolean;
  defaultOpenState?: boolean;
  audioUrl?: string;
  title?: string;
  containerStyle?: ViewStyle;
};

const OPENED_WITH =
  Dimensions.get('window').width - CONSTANTS.spaces.paddingHorizontal * 2;
const CLOSED_WIDTH = 60;

const SLIDER_THEME = {
  disableMinTrackTintColor: '#fff',
  maximumTrackTintColor: '#fff',
  minimumTrackTintColor: CONSTANTS.colors.bg1,
  cacheTrackTintColor: '#333',
  bubbleBackgroundColor: '#666',
  heartbeatColor: '#999',
};

const AudioContainer = ({
  withTitle,
  withClose,
  audioUrl,
  title,
  containerStyle,
  checkTitles,
  absolute,
  defaultOpenState = false,
}: Props) => {
  const {
    isPlaying,
    isLoading,
    isPaused,
    dropState,
    setPause,
    isAudioLoaded,
    durationSeconds,
    positionSeconds,
    audioTitle,
    startPlayFromSecond,
    goPlay,
    playSound,
  } = useStores(stores => {
    const isSameAudio = checkTitles
      ? stores.soundStore.audioTitle && stores.soundStore.audioTitle === title
      : true;
    return {
      isPlaying: isSameAudio && stores.soundStore.isPlaying,
      isPaused: isSameAudio && stores.soundStore.isPaused,
      isLoading: isSameAudio && stores.soundStore.isLoading,
      dropState: stores.soundStore.dropState,
      goPlay: stores.soundStore.goPlay,
      playSound: stores.soundStore.playSound,
      setPause: stores.soundStore.setPause,
      durationSeconds: isSameAudio ? stores.soundStore.durationSeconds : 0,
      positionSeconds: isSameAudio ? stores.soundStore.positionSeconds : 0,
      isAudioLoaded: isSameAudio && stores.soundStore.isAudioLoaded,
      audioTitle: stores.soundStore.audioTitle,
      startPlayFromSecond: stores.soundStore.startPlayFromSecond,
    };
  });

  const [isOpen, setIsOpen] = useState(defaultOpenState);

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  const thumbScaleValue = useSharedValue(1);
  const isScrubbing = useSharedValue(false);

  const aSliderOpacity = useSharedValue(defaultOpenState ? 1 : 0);
  const aContainerWidth = useSharedValue(
    defaultOpenState ? OPENED_WITH : CLOSED_WIDTH
  );

  const aSliderStyles = useAnimatedStyle(() => {
    return {
      opacity: aSliderOpacity.value,
      ...(aSliderOpacity.value === 0
        ? { display: 'none' }
        : { display: 'flex' }),
    };
  });
  const aContainerStyles = useAnimatedStyle(() => {
    return {
      width: aContainerWidth.value,
    };
  });

  const toggleOpen = () => {
    const shouldOpen = !isOpen;
    if (shouldOpen) {
      setIsOpen(true);
      aContainerWidth.value = withTiming(OPENED_WITH, { duration: 80 }, () => {
        aSliderOpacity.value = withTiming(1);
      });
    } else {
      aSliderOpacity.value = withTiming(0, {}, () => {
        aContainerWidth.value = withTiming(CLOSED_WIDTH, { duration: 80 });
        runOnJS(setIsOpen)(false);
      });
    }
  };

  const onSlidingStart = () => {
    // setPause();
    thumbScaleValue.value = 2;
    isScrubbing.value = true;
  };
  const onSlidingComplete = () => {
    thumbScaleValue.value = 1;
    isScrubbing.value = false;

    startPlayFromSecond(progress.value);
  };
  const onValueChange = e => {
    progress.value = Math.round(e);
  };

  const handlePlay = () => {
    if (isPlaying) {
      setPause();
    } else {
      if (audioUrl && title) {
        playSound(audioUrl, title);
      } else {
        goPlay();
      }
    }
  };

  useEffect(() => {
    progress.value = positionSeconds;
  }, [positionSeconds]);

  useEffect(() => {
    max.value = durationSeconds;
  }, [durationSeconds]);

  const showCloseAction = !!isAudioLoaded;

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        !absolute && styles.staticContainer,
        absolute && {
          ...styles.absolute,
          ...(isOpen
            ? {
                padding: 10,
              }
            : {
                justifyContent: 'center',
                padding: 0,
              }),
        },
        aContainerStyles,
      ]}
    >
      <Animated.View
        key="Slider"
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          },
          aSliderStyles,
        ]}
      >
        <GestureHandlerRootView style={[styles.slider]}>
          {withTitle && <CText style={styles.title}>{audioTitle}</CText>}
          <Slider
            theme={SLIDER_THEME}
            progress={progress}
            minimumValue={min}
            maximumValue={max}
            sliderHeight={4}
            thumbWidth={18}
            thumbScaleValue={thumbScaleValue}
            bubble={s => {
              return secToTime(Math.round(s), true);
            }}
            bubbleTranslateY={-30}
            onSlidingStart={onSlidingStart}
            onSlidingComplete={onSlidingComplete}
            onValueChange={onValueChange}
          />
        </GestureHandlerRootView>

        <View style={[styles.actions]}>
          <PlaySoundIconButton
            playSound={handlePlay}
            isPaused={isPaused}
            isPlaying={isPlaying}
            isLoading={isLoading}
          />
          {showCloseAction && <CloseIcon onPress={dropState} />}
        </View>
      </Animated.View>
      {withClose && isAudioLoaded && (
        <CloseOpenIcon isOpen={isOpen} onPress={toggleOpen} />
      )}
    </Animated.View>
  );
};

export default observer(AudioContainer);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  staticContainer: {
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
    marginBottom: 10,
  },
  absolute: {
    position: 'absolute',
    right: CONSTANTS.spaces.paddingHorizontal,
    height: 60,
    borderRadius: 6,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  slider: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
  },
});
