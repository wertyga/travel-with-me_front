import {
  ActivityIndicator,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import { CText } from '@/components/CText';
import { FastImageBackground } from '@/components/Image';
import { CONSTANTS } from '@/styles/constants';
import { FONTS } from '@/types';

import safeLoaderImage from '@/assets/splash.png';

type Props = {
  image?: string;
  textColor?: string;
  indicatorColor?: string;
};

const Children = ({ textColor, indicatorColor }) => {
  return (
    <View style={{ ...styles.loadingContent }}>
      <ActivityIndicator size="small" color={indicatorColor} />
      <CText style={{ ...styles.text, color: textColor }}>Loading...</CText>
    </View>
  );
};

export const SafeLoader = ({
  image,
  textColor = CONSTANTS.colors.bg2,
  indicatorColor = CONSTANTS.colors.bg2,
}: Props) => {
  if (image) {
    return (
      <FastImageBackground
        uri={image}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <Children textColor={textColor} indicatorColor={indicatorColor} />
      </FastImageBackground>
    );
  }

  return (
    <ImageBackground
      style={[StyleSheet.absoluteFillObject, styles.container]}
      source={safeLoaderImage}
    >
      <Children textColor={textColor} indicatorColor={indicatorColor} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    fontFamily: FONTS.OpenSansSemiBold,
    marginLeft: 10,
  },
  loadingContent: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
