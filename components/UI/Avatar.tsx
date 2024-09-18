import React from 'react';

import { Image, StyleSheet, View, ViewStyle } from 'react-native';

import { CText } from '@/components/CText';

export type Props = {
  avatar: string;
  username?: string;
  size?: number;
  style?: ViewStyle;
  filled?: boolean;
};

export const Avatar = ({
  avatar,
  username,
  size = 70,
  style,
  filled,
}: Props) => {
  return (
    <View
      style={[
        {
          ...styles.container,
          ...{
            width: size,
            height: size,
          },
        },
        filled && styles.filledContainer,
        style,
      ]}
    >
      {!!avatar && <Image source={{ uri: avatar }} style={styles.imageStyle} />}

      {!avatar && !!username && (
        <CText style={[{ fontSize: size / 2 }, filled && styles.filled]} light>
          {username.charAt(0).toUpperCase()}
        </CText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    padding: 3,
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
  edit: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
  },
  filledContainer: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  filled: {
    color: 'black',
  },
});
