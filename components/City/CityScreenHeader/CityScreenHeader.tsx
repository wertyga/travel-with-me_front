import React, { useEffect } from 'react';

import {
  Dimensions,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { observer } from 'mobx-react-lite';

import { BackButton } from '@/Layouts/MainLayout/components/BackButton';
import { CText } from '@/components/CText';
import {
  HeaderMenu,
  HeaderMenuProps,
} from '@/components/City/CityScreenHeader/HeaderMenu';

import { FONTS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  style?: StyleProp<ViewStyle | TextStyle>;
  title: string;
  isDark?: boolean;
  withBackButton?: boolean;
  numberOfLines?: number;
  menu?: HeaderMenuProps['items'];
};

export const CityScreenHeaderComponent = ({
  style,
  title,
  menu,
  isDark,
  withBackButton,
  numberOfLines = 2,
}: Props) => {
  const { color, ...viewStyle } = style || ({} as any);

  return (
    <View style={[styles.container, viewStyle]}>
      {withBackButton && <BackButton style={styles.backBtn} />}
      <View style={[styles.titleContainer]}>
        <CText
          style={[styles.title, withBackButton && { left: -20 }]}
          numberOfLines={numberOfLines}
          light={!isDark}
        >
          {title}
        </CText>
      </View>

      {!!menu && <HeaderMenu items={menu} />}
    </View>
  );
};

export const CityScreenHeader = observer(CityScreenHeaderComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    flexGrow: 1,
  },
  backBtn: {
    left: CONSTANTS.spaces.paddingHorizontal,
    position: 'relative',
  },
  titleContainer: {
    flexGrow: 1,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontFamily: FONTS.CrimsonBold,
    fontSize: 30,
  },
  hide: {
    opacity: 0,
  },
});
