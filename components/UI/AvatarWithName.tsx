import React from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import { CText } from '@/components/CText';

import { Language } from '@/types/user';

import { Props as AvatarProps, Avatar as UIAvatar } from './Avatar';

type Props = AvatarProps & {
  containerStyle?: ViewStyle;
  underNameText?: string;
  verticalAlign?: 'center';
  languages?: Language[];
};

export const AvatarWithName = ({
  username,
  containerStyle,
  underNameText,
  verticalAlign,
  languages = [],
  style: avatarStyles = {},
  ...avatarProps
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        verticalAlign === 'center' && styles.verticalAlignCanter,
        containerStyle,
      ]}
    >
      <UIAvatar
        username={username}
        size={50}
        style={{ ...avatarStyles, ...styles.avatar }}
        {...avatarProps}
      />
      <View style={styles.nameContainer}>
        <CText style={styles.username} numberOfLines={1} light>
          {username}
        </CText>
        {!!underNameText && (
          <CText style={styles.underNameText} light>
            {underNameText}
          </CText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  verticalAlignCanter: {
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  nameContainer: {},
  username: {},
  underNameText: {
    fontSize: 12,
  },
});
