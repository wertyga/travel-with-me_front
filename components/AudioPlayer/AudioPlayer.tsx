import { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { AudioLine } from './AudioLine';

type Props = {
  audioUrl: string;
};

export const AudioPlayer = ({ audioUrl }: Props) => {
  const audio = useRef<any>();
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
      isPlaying: isPlaying,
      playedPercent: Math.round(positionMillis / ((durationMillis || 1) / 100)),
    }));
  };

  async function playSound() {
    if (audio.current) {
      const { isPlaying } = await audio.current.getStatusAsync();
      if (isPlaying) {
        audio.current.pauseAsync();
        setState(prev => ({ ...prev, isPaused: true }));
      } else {
        audio.current.playAsync();
        setState(prev => ({ ...prev, isPaused: false }));
      }
      return;
    }
    setState(prev => ({ ...prev, isLoading: true }));
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      undefined,
      onPlaybackStatusUpdate
    );

    audio.current = sound;

    setState(prev => ({ ...prev, isLoading: false }));
    await sound.playAsync();
  }

  useEffect(() => {
    return () => {
      audio.current?.unloadAsync();
      audio.current = null;
    };
  }, []);

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
