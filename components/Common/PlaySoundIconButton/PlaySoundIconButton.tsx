import React from 'react';

import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

type Props = {
  playSound: () => void;
  small?: boolean;
  iconSize?: number;
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
  iconSize: iconSizeFromProps,
}) => {
  const iconSize = iconSizeFromProps || (small ? 36 : 40);

  return (
    <TouchableOpacity onPress={playSound} disabled={!!isLoading}>
      {!!isLoading && (
        <ActivityIndicator
          size={iconSize}
          color="white"
          style={{ marginTop: 2 }}
        />
      )}
      {isPlaying && !isPaused && !isLoading && (
        <Ionicons name="pause-circle-outline" size={iconSize} color={'white'} />
      )}
      {(!isPlaying || isPaused) && !isLoading && (
        <Ionicons name="play-circle-outline" size={iconSize} color={'white'} />
      )}
    </TouchableOpacity>
  );
};
