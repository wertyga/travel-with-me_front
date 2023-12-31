import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  ImageBackground,
} from 'react-native';
import { View } from 'react-nativewind';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import { FooterMenu } from '@/components/FooterMenu/FooterMenu';
import { BackgroundGradient } from '@/components/BackgroundGradient';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  bgImage?: string | any;
  noFooter?: boolean;
};

export const MainLayout = ({
  children,
  style,
  containerStyle,
  bgImage,
  noFooter,
}: Props) => {
  return (
    <SafeAreaView style={cn(containerStyle)}>
      {bgImage && (
        <ImageBackground
          source={typeof bgImage === 'string' ? { uri: bgImage } : bgImage}
        >
          <View
            style={cn(
              styles.container,
              styles.fade,
              { [!noFooter]: styles.withFooter },
              style
            )}
          >
            {children}
          </View>
        </ImageBackground>
      )}
      {!bgImage && (
        <BackgroundGradient>
          <View style={cn(styles.container, style)}>{children}</View>
        </BackgroundGradient>
      )}

      {!noFooter && <FooterMenu />}
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
  fade: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
