import { useCallback, useEffect, useRef, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import { Audio } from 'expo-av';

import { observer } from 'mobx-react-lite';

import { PlaySoundIconButton } from '@/components/Common';
import { useFocus, useStores } from '@/hooks';

import { AudioLine } from './AudioLine';

type Props = {
  audioUrl: string;
  autoplay?: boolean;
  simple?: boolean;
  small?: boolean;
  title: string;
};

const AudioPlayer = ({ audioUrl, autoplay, simple, small, title }: Props) => {
  const {
    isPlaying,
    isLoading,
    isPaused,
    playedPercent,
    dropState,
    playSound,
    setPause,
  } = useStores(stores => {
    const isSameSound = stores.soundStore.audioUrl === audioUrl;
    return {
      isPlaying: isSameSound && stores.soundStore.isPlaying,
      isLoading: isSameSound && stores.soundStore.isLoading,
      isPaused: isSameSound && stores.soundStore.isPaused,
      playedPercent: isSameSound && stores.soundStore.playedPercent,
      dropState: stores.soundStore.dropState,
      playSound: stores.soundStore.playSound,
      setPause: stores.soundStore.setPause,
    };
  });

  const handlePlay = () => {
    if (isLoading) return;

    if (isPlaying) {
      setPause();
    } else {
      playSound(audioUrl, title);
    }
  };

  useEffect(() => {
    if (autoplay) {
      playSound(audioUrl, title);
    } else if (isLoading) {
      dropState();
    }
  }, [autoplay]);

  return (
    <View
      style={[
        styles.container,
        simple && styles.simple,
        small && styles.small,
        small && simple && styles.simpleSmall,
      ]}
    >
      <View
        style={[
          styles.btns,
          simple && styles.simple,
          small && styles.small,
          small && simple && styles.simpleSmall,
        ]}
      >
        <PlaySoundIconButton
          isPaused={isPaused}
          isPlaying={isPlaying}
          playSound={handlePlay}
          small={small}
        />
      </View>
      {!simple && <AudioLine progressInPercentage={playedPercent} />}
    </View>
  );
};

export default observer(AudioPlayer);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 54,
    paddingVertical: 8,
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 40,
    backgroundColor: 'rgba(246, 245, 242, 0.40)',
  },
  simple: {
    width: 54,
    borderRadius: 54,
    paddingRight: 0,
    paddingLeft: 0,
    paddingVertical: 0,
    marginRight: 0,
    alignItems: 'center',
  },
  simpleSmall: {
    width: 40,
  },
  small: {
    height: 40,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginRight: 10,
  },
});
