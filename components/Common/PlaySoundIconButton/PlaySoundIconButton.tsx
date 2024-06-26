import React from 'react';

import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

type Props = {
  playSound: () => void;
  small?: boolean;
  isLoading?: boolean;
  isPlaying: boolean;
  isPaused: boolean;
};

export const PlaySoundIconButton: React.FC<Props> = ({
  playSound,
  isLoading,
  isPaused,
  isPlaying,
  small,
}) => {
  const iconSize = small ? 36 : 40;

  return (
    <TouchableOpacity onPress={playSound} disabled={isLoading}>
      {isPlaying && !isPaused && (
        <Ionicons
          name="pause-circle-outline"
          size={iconSize}
          color={isLoading ? 'rgba(255, 255, 255, 0.40)' : 'white'}
        />
      )}
      {(!isPlaying || isPaused) && (
        <Ionicons
          name="play-circle-outline"
          size={iconSize}
          color={isLoading ? 'rgba(255, 255, 255, 0.40)' : 'white'}
        />
      )}
    </TouchableOpacity>
  );
};
