import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { CText } from '@/components/CText';
import { FastImageBackground } from 'components/FastImage';

import { FONTS } from '@/types';

import safeLoaderImage from '@/assets/splash.png';

type Props = {
  image?: string;
  textColor?: string;
  indicatorColor?: string;
  fetchError?: { message: string; statusCode: number };
  reFetchMethod?: (data?: any) => void;
};

const Children = ({ textColor, indicatorColor }: any) => {
  return (
    <View style={{ ...styles.loadingContent }}>
      <ActivityIndicator size="small" color={indicatorColor} />
      <CText style={{ ...styles.text, color: textColor }}>Loading...</CText>
    </View>
  );
};

export const SafeLoader = ({
  image,
  textColor = 'white',
  indicatorColor = 'white',
  fetchError,
  reFetchMethod,
}: Props) => {
  if (image) {
    return (
      <FastImageBackground
        source={image}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <Children textColor={textColor} indicatorColor={indicatorColor} />
      </FastImageBackground>
    );
  }

  return (
    <FastImageBackground
      style={[StyleSheet.absoluteFillObject, styles.container]}
      source={safeLoaderImage}
    >
      <Children textColor={textColor} indicatorColor={indicatorColor} />
    </FastImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
