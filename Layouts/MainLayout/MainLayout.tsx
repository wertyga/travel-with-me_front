import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-nativewind';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import { FooterMenu } from '@/components/FooterMenu/FooterMenu';
import { ImageBackground, CImageProps } from '@/components/Image';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { LinearGradient } from 'expo-linear-gradient';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { useNavigation } from '@react-navigation/native';
import { Loader } from '@/components/Loader';
import { useLayout } from '@/context';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  bgImage?: CImageProps['source'];
  noFooter?: boolean;
  isLoading?: boolean;
  headerTitle?: string;
  loaderTextColor?: string;
};

export const MainLayout = ({
  children,
  style,
  containerStyle,
  bgImage,
  noFooter,
  headerTitle,
  isLoading,
  loaderTextColor,
}: Props) => {
  const navi = useNavigation();
  const { setHeight } = useLayout();

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={cn(styles.main, containerStyle)}>
      {isLoading && <Loader textColor={loaderTextColor} />}
      <GestureHandlerRootView>
        <View
          style={styles.container}
          onLayout={e => {
            setHeight(e.nativeEvent.layout.height);
          }}
        >
          {!!headerTitle && (
            <CityScreenHeader title={headerTitle} style={styles.header} />
          )}

          {bgImage && (
            <ImageBackground
              source={bgImage}
              width={Dimensions.get('window').width}
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
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {},
  container: {
    height: '100%',
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
    ...StyleSheet.absoluteFillObject,
  },
  withFooter: {
    paddingBottom: 70,
  },
  header: {
    marginTop: 50,
  },
});
