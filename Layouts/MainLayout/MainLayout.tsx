import React, { ReactNode } from 'react';

import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { observer } from 'mobx-react-lite';

import { FetchErrorWrapper } from '@/Layouts/MainLayout/FetchErrorWrapper';
import { AudioContainer } from '@/components/Audio';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { HeaderMenuProps } from '@/components/City/CityScreenHeader/HeaderMenu';
import { FastImage } from '@/components/FastImage';
import { FooterMenu } from '@/components/FooterMenu';
import { Loader } from '@/components/Loader';
import { useStores } from '@/hooks';

import { SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  isHeaderDark?: boolean;
  bgImage?: string | number;
  noFooter?: boolean;
  isLoading?: boolean;
  headerTitle?: string;
  floatingTitle?: boolean;
  withHeaderShadow?: boolean;
  loaderTextColor?: string;
  numberOfLinesTitle?: number;
  menu?: HeaderMenuProps['items'];
  onBgPress?: () => void;
  bgContent?: ReactNode;
  fetchError?: { message: string; statusCode: number };
  reFetchMethod?: (data?: any) => void;
  bgColors?: string[];
};

export const MainLayoutComponent = ({
  children,
  style,
  containerStyle,
  bgImage,
  noFooter,
  headerTitle,
  isLoading,
  loaderTextColor,
  menu,
  isHeaderDark,
  onBgPress,
  bgContent,
  withHeaderShadow,
  bgColors,
  numberOfLinesTitle,
}: Props) => {
  const {
    layoutHeight,
    updateDomState,
    isPaused,
    isPlaceScreen,
    isPlaying,
    place,
    audioTitle,
  } = useStores(stores => ({
    layoutHeight: stores.domStore.layoutHeight,
    updateDomState: stores.domStore.updateDomState,
    place: stores.placeStore.place,
    isPlaying: stores.soundStore.isPlaying,
    isPaused: stores.soundStore.isPaused,
    audioTitle: stores.soundStore.audioTitle,
    isAudioLoaded: stores.soundStore.isAudioLoaded,
    isPlaceScreen: stores.routerStore.currentRoute?.name === SCREENS.Place,
    isGuideMapScreen:
      stores.routerStore.currentRoute?.name === SCREENS.GuideMap,
  }));

  const isInAction = isPlaying || isPaused;
  const isShowOnPlaceScreen =
    isPlaceScreen && !!place && place.title !== audioTitle;
  const showAudioContainer =
    (!isPlaceScreen && isInAction) || (isShowOnPlaceScreen && isInAction);

  return (
    <View
      style={[styles.main, containerStyle]}
      onLayout={e => {
        updateDomState({
          layout: { height: e.nativeEvent.layout.height },
        });
      }}
    >
      {isHeaderDark && <StatusBar style="dark" />}
      {!bgImage && (
        <BackgroundGradient style={styles.bgGradient} colors={bgColors} />
      )}
      <>
        {isLoading && <Loader textColor={loaderTextColor} />}

        {!!headerTitle && (
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
              menu={menu}
              numberOfLines={numberOfLinesTitle}
            />
          </LinearGradient>
        )}

        {!!bgContent && <View style={styles.bgImage}>{bgContent}</View>}

        {bgImage && (
          <TouchableOpacity
            onPress={onBgPress}
            style={[StyleSheet.absoluteFillObject, { height: layoutHeight }]}
            activeOpacity={1}
          >
            <FastImage source={bgImage} style={styles.bgImage} />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.01)']}
              style={[StyleSheet.absoluteFillObject]}
            />
          </TouchableOpacity>
        )}

        <View
          style={[
            styles.content,
            !noFooter && styles.withFooter,
            {
              paddingTop: !!headerTitle ? 100 : 50,
            },
            style,
          ]}
        >
          {children}
        </View>

        {showAudioContainer && (
          <AudioContainer
            withTitle
            withClose
            absolute
            containerStyle={styles.audioContainer}
          />
        )}
        {!noFooter && <FooterMenu />}
      </>
    </View>
  );
};

export const MainLayout = observer(MainLayoutComponent);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {},
  audioContainer: {
    zIndex: 2,
    top: 95,
    backgroundColor: CONSTANTS.colors.bg2,
  },
  openedStyleAudio: {
    left: 15,
    paddingLeft: 15,
    paddingRight: 10,
  },
  bgGradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  content: {
    paddingHorizontal: CONSTANTS.spaces.paddingHorizontal,
    flex: 1,
  },
  bgImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  withFooter: {
    paddingBottom: CONSTANTS.spaces.footerHeight,
  },
  header: {
    top: 0,
    left: 0,
    paddingTop: 40,
    paddingBottom: 20,
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
});
