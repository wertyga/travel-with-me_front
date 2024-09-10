import React, { useEffect } from 'react';

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import {
  HeaderMenu,
  HeaderMenuProps,
} from '@/components/City/CityScreenHeader/HeaderMenu';
import { useStores } from '@/hooks';

import { FONTS } from '@/types';

type Props = {
  style?: StyleProp<ViewStyle | TextStyle>;
  title: string;
  isDark?: boolean;
  numberOfLines?: number;
  menu?: HeaderMenuProps['items'];
};

export const CityScreenHeaderComponent = ({
  style,
  title,
  menu,
  isDark,
  numberOfLines = 2,
}: Props) => {
  const { header } = useStores(stores => ({
    header: stores.domStore.header,
  }));

  const translateY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    } as any;
  });

  useEffect(() => {
    translateY.value = withTiming(header.hidden ? -150 : 0);
  }, [header.hidden]);

  const { color, ...viewStyle } = style || ({} as any);

  return (
    <Animated.View style={[styles.container, viewStyle, animatedStyles]}>
      <CText
        style={[styles.title, isDark && styles.dark]}
        numberOfLines={numberOfLines}
      >
        {title}
      </CText>

      {!!menu && <HeaderMenu items={menu} />}
    </Animated.View>
  );
};

export const CityScreenHeader = observer(CityScreenHeaderComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    zIndex: 10,
  },
  btn: {
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    fontFamily: FONTS.CrimsonBold,
    fontSize: 30,
    textAlign: 'center',
    flex: 1,
  },
  dark: {
    color: 'black',
  },
  hide: {
    opacity: 0,
  },
});
