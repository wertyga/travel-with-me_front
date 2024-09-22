import React, { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { LinearGradient } from 'expo-linear-gradient';

import { observer } from 'mobx-react-lite';

import { BackButton } from '@/Layouts/MainLayout/components/BackButton';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { useStores } from '@/hooks';

import { CONSTANTS } from '@/styles/constants';

import { Props as MainLayoutProps } from '../MainLayout';

type Props = Pick<
  MainLayoutProps,
  | 'withHeaderShadow'
  | 'isHeaderDark'
  | 'headerTitle'
  | 'numberOfLinesTitle'
  | 'withBackButton'
  | 'isHeaderHidden'
> & {};

export const HeaderTitle = ({
  withHeaderShadow,
  headerTitle,
  isHeaderDark,
  numberOfLinesTitle,
  withBackButton,
  isHeaderHidden,
}: Props) => {
  const translateY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    } as any;
  });

  useEffect(() => {
    translateY.value = withTiming(isHeaderHidden ? -150 : 0);
  }, [isHeaderHidden]);

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <LinearGradient
        colors={
          withHeaderShadow
            ? ['rgba(0, 0, 0, 0.6)', 'transparent']
            : ['transparent', 'transparent']
        }
        style={styles.header}
      >
        <CityScreenHeader
          title={headerTitle}
          isDark={isHeaderDark}
          // menu={menu}
          numberOfLines={numberOfLinesTitle}
          withBackButton={withBackButton}
        />
      </LinearGradient>
    </Animated.View>
  );
};

export default observer(HeaderTitle);

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 10,
    width: '100%',
  },
  header: {
    paddingTop: CONSTANTS.spaces.paddingTop,
    flexDirection: 'row',
  },
});
