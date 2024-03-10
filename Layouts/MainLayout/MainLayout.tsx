import React, { ReactNode } from 'react';
import {
  StyleSheet,
  ViewStyle,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import { FooterMenu } from '@/components/FooterMenu/FooterMenu';
import { ImageBackground, CImageProps } from '@/components/Image';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { LinearGradient } from 'expo-linear-gradient';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { Loader } from '@/components/Loader';
import { HeaderMenuProps } from '@/components/City/CityScreenHeader/HeaderMenu';
import { updateDomAction } from '@/stores';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  isHeaderDark?: boolean;
  bgImage?: CImageProps['source'];
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
          <Image source={bgImage} style={styles.bgImage} />
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
    // position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    // height: '100%',
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
    paddingHorizontal: 15,
    flex: 1,
    paddingTop: 100,
    // height: '90%',
    // backgroundColor: 'blue',
  },
  bgImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  withFooter: {
    paddingBottom: 70,
  },
  header: {
    // marginTop: 40,
    top: 40,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
});
