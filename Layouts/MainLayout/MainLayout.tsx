import React, { ReactNode, useEffect, useLayoutEffect } from 'react';

import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { StatusBar } from 'expo-status-bar';

import { observer } from 'mobx-react-lite';

import { BgContent } from '@/Layouts/MainLayout/components/BgContent';
import HeaderTitle from '@/Layouts/MainLayout/components/HeaderTitle';
import { AudioContainer } from '@/components/Audio';
import { HeaderMenuProps } from '@/components/City/CityScreenHeader/HeaderMenu';
import { FooterMenu } from '@/components/FooterMenu';
import { Footer } from '@/components/FooterMenu/Footer';
import { Loader } from '@/components/Loader';
import { useStores } from '@/hooks';

import { SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

export type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  isHeaderDark?: boolean;
  bgImage?: string | number;
  noFooter?: boolean;
  noPaddings?: boolean;
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
  withBackButton?: boolean;
  isHeaderHidden?: boolean;
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
  withBackButton,
  isHeaderHidden,
  noPaddings,
  numberOfLinesTitle = 1,
}: Props) => {
  const {
    updateDomState,
    isPaused,
    isPlaceScreen,
    isPlaying,
    place,
    audioTitle,
    currentRoute,
  } = useStores(stores => ({
    updateDomState: stores.domStore.updateDomState,
    place: stores.placeStore.place,
    currentRoute: stores.routerStore.currentRoute,
    isPlaying: stores.soundStore.isPlaying,
    isPaused: stores.soundStore.isPaused,
    audioTitle: stores.soundStore.audioTitle,
    isAudioLoaded: stores.soundStore.isAudioLoaded,
    isPlaceScreen: stores.routerStore.currentRoute?.name === SCREENS.Place,
    isGuideMapScreen:
      stores.routerStore.currentRoute?.name === SCREENS.GuideMap,
  }));

  useLayoutEffect(() => {
    updateDomState({
      header: {
        hidden: false,
      },
      footer: {
        hidden: false,
      },
    });
  }, [currentRoute]);

  const isInAction = isPlaying || isPaused;
  const isShowOnPlaceScreen =
    isPlaceScreen && !!place && place.title !== audioTitle;
  const showAudioContainer =
    (!isPlaceScreen && isInAction) || (isShowOnPlaceScreen && isInAction);

  return (
    <SafeAreaView
      style={[styles.main, containerStyle]}
      onLayout={e => {
        updateDomState({
          layout: { height: e.nativeEvent.layout.height },
        });
      }}
    >
      <StatusBar style={isHeaderDark ? 'dark' : 'light'} />
      <BgContent
        bgImage={bgImage}
        onBgPress={onBgPress}
        bgContent={bgContent}
        bgColors={bgColors}
      />

      <>
        {isLoading && <Loader textColor={loaderTextColor} />}

        {!!headerTitle && (
          <HeaderTitle
            withHeaderShadow={withHeaderShadow}
            headerTitle={headerTitle}
            isHeaderDark={isHeaderDark}
            numberOfLinesTitle={numberOfLinesTitle}
            withBackButton={withBackButton}
            isHeaderHidden={isHeaderHidden}
          />
        )}
        <View
          style={[
            styles.content,
            { paddingTop: !!headerTitle ? 120 : 70 },
            noPaddings && { paddingHorizontal: 0 },
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
      </>
      {!noFooter && <Footer />}
    </SafeAreaView>
  );
};

export const MainLayout = observer(MainLayoutComponent);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {},
  audioContainer: {
    top: CONSTANTS.spaces.paddingTop,
    zIndex: 20,
  },
  content: {
    paddingHorizontal: CONSTANTS.spaces.paddingHorizontal,
    flex: 1,
    flexGrow: 1,
  },
});
