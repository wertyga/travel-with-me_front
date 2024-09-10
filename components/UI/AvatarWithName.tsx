import React from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import { CText } from '@/components/CText';

import { Props as AvatarProps, Avatar as UIAvatar } from './Avatar';

type Props = AvatarProps & {
  containerStyle?: ViewStyle;
};

export const AvatarWithName = ({
  username,
  containerStyle,
  ...avatarProps
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <UIAvatar username={username} size={50} {...avatarProps} />
      <CText style={styles.username} numberOfLines={1}>
        {username}
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
  },
  username: {
    marginTop: 10,
  },
});
