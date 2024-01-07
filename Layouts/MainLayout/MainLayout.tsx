import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  ImageBackground,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-nativewind';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import { FooterMenu } from '@/components/FooterMenu/FooterMenu';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { LinearGradient } from 'expo-linear-gradient';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  bgImage?: string | any;
  noFooter?: boolean;
  headerTitle?: string;
};

export const MainLayout = ({
  children,
  style,
  containerStyle,
  bgImage,
  noFooter,
  headerTitle,
}: Props) => {
  return (
    <SafeAreaView style={cn(containerStyle)}>
      <GestureHandlerRootView>
        {bgImage && (
          <ImageBackground
            source={typeof bgImage === 'string' ? { uri: bgImage } : bgImage}
          >
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.01)']}
            >
              <View
                style={cn(
                  styles.container,
                  { [!noFooter]: styles.withFooter },
                  style
                )}
              >
                {children}
              </View>
            </LinearGradient>
          </ImageBackground>
        )}
        {!bgImage && (
          <BackgroundGradient>
            <View style={cn(styles.container, style)}>{children}</View>
          </BackgroundGradient>
        )}

        {!noFooter && <FooterMenu />}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 15,
    position: 'relative',
  },
  withFooter: {
    paddingBottom: 70,
  },
});
