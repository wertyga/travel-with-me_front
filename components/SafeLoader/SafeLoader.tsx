import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import { FetchErrorWrapper } from '@/Layouts/MainLayout/FetchErrorWrapper';
import { CText } from '@/components/CText';
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
      <FetchErrorWrapper fetchError={fetchError} reFetchMethod={reFetchMethod}>
        <ImageBackground
          source={typeof image !== 'string' ? image : { uri: image }}
          style={[StyleSheet.absoluteFillObject, styles.container]}
        >
          <Children textColor={textColor} indicatorColor={indicatorColor} />
        </ImageBackground>
      </FetchErrorWrapper>
    );
  }

  return (
    <FetchErrorWrapper fetchError={fetchError} reFetchMethod={reFetchMethod}>
      <ImageBackground
        style={[StyleSheet.absoluteFillObject, styles.container]}
        source={safeLoaderImage}
      >
        <Children textColor={textColor} indicatorColor={indicatorColor} />
      </ImageBackground>
    </FetchErrorWrapper>
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
