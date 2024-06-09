import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/src/Audio/Sound';
import { AudioLine } from './AudioLine';

type Props = {
  audioUrl: string;
  autoplay?: boolean;
  onPlay?: (isPlaying: boolean) => void;
};

export const AudioPlayer = ({ audioUrl, autoplay, onPlay }: Props) => {
  const audio = useRef<Audio.Sound | null>(null);
  const [state, setState] = useState({
    isPlaying: false,
    isLoading: false,
    isPaused: false,
    playedPercent: 0,
  });

  const onPlaybackStatusUpdate = status => {
    const { positionMillis, durationMillis, isPlaying } = status;
    setState(prev => ({
      ...prev,
      isPlaying,
      playedPercent: Math.round(positionMillis / ((durationMillis || 1) / 100)),
    }));
  };

  const goPlaySound = async () => {
    await audio.current?.playAsync();
    onPlay?.(true);
  };

  const goStopSound = () => {
    audio.current?.stopAsync();
    audio.current?.setPositionAsync(0);
    onPlay?.(false);
  };

  const setPause = () => {
    audio.current?.pauseAsync();
    setState(prev => ({ ...prev, isPaused: true, isLoading: false }));
  };

  async function playSound() {
    setState(prev => ({ ...prev, isLoading: true }));

    if (audio.current) {
      if (state.isPlaying) {
        setPause();
      } else {
        goPlaySound();
        setState(prev => ({ ...prev, isPaused: false, isLoading: false }));
      }
      return;
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      undefined,
      onPlaybackStatusUpdate
    );

    audio.current = sound;

    setState(prev => ({ ...prev, isLoading: false }));
    await goPlaySound();
  }

  const dropState = () => {
    audio.current?.unloadAsync();
    audio.current = null;
  };

  useEffect(() => {
    if (autoplay) {
      playSound();
    } else if (state.isLoading) {
      dropState();
    } else if (!autoplay && state.isPlaying) {
      setPause();
    }
  }, [autoplay]);

  useEffect(() => {
    if (state.playedPercent !== 100 || state.isPlaying) return;

    goStopSound();
  }, [state.playedPercent, state.isPlaying]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dropState();
      };
    }, [])
  );

  const { isPlaying, isLoading, isPaused, playedPercent } = state;
  return (
    <View style={styles.container}>
      <View style={styles.btns}>
        <TouchableOpacity onPress={playSound} disabled={isLoading}>
          {isPlaying && !isPaused && (
            <Ionicons
              name="pause-circle-outline"
              size={40}
              color={isLoading ? 'rgba(255, 255, 255, 0.40)' : 'white'}
            />
          )}
          {(!isPlaying || isPaused) && (
            <Ionicons
              name="play-circle-outline"
              size={40}
              color={isLoading ? 'rgba(255, 255, 255, 0.40)' : 'white'}
            />
          )}
        </TouchableOpacity>
      </View>
      <AudioLine progressInPercentage={playedPercent} />
    </View>
  );
};

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
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginRight: 10,
  },
});
