import React, { ReactNode } from 'react';
import {
  StyleSheet,
  ViewStyle,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  ImageProps,
} from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import { FooterMenu } from '@/components/FooterMenu/FooterMenu';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { LinearGradient } from 'expo-linear-gradient';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { Loader } from '@/components/Loader';
import { FastImage } from '@/components/Image';
import { HeaderMenuProps } from '@/components/City/CityScreenHeader/HeaderMenu';
import { updateDomAction } from '@/stores';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  isHeaderDark?: boolean;
  bgImage?: string | number;
  noFooter?: boolean;
  isLoading?: boolean;
  headerTitle?: string;
  loaderTextColor?: string;
  menu?: HeaderMenuProps['menu'];
  onBgPress?: () => void;
  bgContent?: ReactNode;
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
  menu,
  isHeaderDark,
  onBgPress,
  bgContent,
}: Props) => {
  const imageSource = typeof bgImage === 'string' ? { uri: bgImage } : bgImage;

  return (
    <View
      style={cn(styles.main, containerStyle)}
      onLayout={e => {
        updateDomAction({
          layout: { height: e.nativeEvent.layout.height },
        });
      }}
    >
      {isLoading && <Loader textColor={loaderTextColor} />}

      {!!headerTitle && (
        <CityScreenHeader
          title={headerTitle}
          style={styles.header}
          isDark={isHeaderDark}
          menu={menu}
        />
      )}

      {!!bgContent && <View style={styles.bgImage}>{bgContent}</View>}

      {bgImage && (
        <TouchableOpacity
          onPress={onBgPress}
          style={styles.bgImage}
          activeOpacity={1}
        >
          <Image source={imageSource} style={styles.bgImage} />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.01)']}
            style={[StyleSheet.absoluteFillObject]}
          />
        </TouchableOpacity>
      )}
      {!bgImage && <BackgroundGradient style={styles.bgGradient} />}

      <View
        style={cn(styles.content, style, { [!noFooter]: styles.withFooter })}
      >
        {children}
      </View>

      {!noFooter && <FooterMenu />}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: Dimensions.get('window').width,
    flex: 1,
  },
  container: {},
  bgGradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  content: {
    paddingHorizontal: 15,
    flex: 1,
    paddingTop: 100,
  },
  bgImage: {
    objectFit: 'cover',
    ...StyleSheet.absoluteFillObject,
  },
  withFooter: {
    paddingBottom: 70,
  },
  header: {
    top: 40,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
});
