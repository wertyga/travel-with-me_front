import React, { useLayoutEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-nativewind';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import { FooterMenu } from '@/components/FooterMenu/FooterMenu';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { LinearGradient } from 'expo-linear-gradient';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { useNavigation } from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  bgImage?: string | any;
  noFooter?: boolean;
  headerTitle?: string;
};

const { height: windowHeight } = Dimensions.get('window');

export const MainLayout = ({
  children,
  style,
  containerStyle,
  bgImage,
  noFooter,
  headerTitle,
}: Props) => {
  const navi = useNavigation();

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={cn(styles.main, containerStyle)}>
      <GestureHandlerRootView style={styles.container}>
        {!!headerTitle && (
          <CityScreenHeader title={headerTitle} style={styles.header} />
        )}

        {bgImage && (
          <ImageBackground
            source={typeof bgImage === 'string' ? { uri: bgImage } : bgImage}
            style={styles.bgImage}
          >
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.01)']}
              style={cn(
                styles.content,
                { [!noFooter]: styles.withFooter },
                style
              )}
            >
              {children}
            </LinearGradient>
          </ImageBackground>
        )}
        {!bgImage && (
          <>
            <BackgroundGradient style={styles.bgGradient} />
            <View style={cn(styles.content, style)}>{children}</View>
          </>
        )}

        {!noFooter && <FooterMenu />}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {},
  container: {
    height: windowHeight,
  },
  bgGradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    paddingHorizontal: 15,
    height: '100%',
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    height: windowHeight,
  },
  withFooter: {
    paddingBottom: 70,
  },
  header: {
    marginTop: 50,
  },
});
