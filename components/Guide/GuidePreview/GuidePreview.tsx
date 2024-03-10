import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS, Guide, SCREENS } from '@/types';
import { useNavigation } from '@/hooks';
import DefaultImage from '@/assets/images/default_point_image.png';
import { CText } from '@/components/CText';
import { CountryPill } from '@/components/Country';
import { getCompressedUrl } from '@/utils';

type Props = {
  guide: Guide;
  containerClassName?: string;
  country: string;
};

const width = Dimensions.get('screen').width * 0.7;

export const GuidePreview = ({ guide, country }: Props) => {
  const navi = useNavigation();

  const navigateToGuide = () => {
    navi.navigate(SCREENS.Guide, {
      guideSlug: guide.slug,
      image: guide.vImage,
    });
  };

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={
        guide.hImage
          ? {
              uri: getCompressedUrl(guide.hImage, width),
            }
          : DefaultImage
      }
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.5)']}
        style={styles.content}
      >
        <TouchableOpacity
          onPress={navigateToGuide}
          activeOpacity={1}
          style={styles.guide}
        >
          <CountryPill style={styles.top} title={country} />

          <View>
            <CText style={styles.title}>{guide.title}</CText>
            {!!guide.pointsCount && <Text>{guide.pointsCount}</Text>}

            <CText numberOfLines={3} style={styles.description}>
              {guide.description}
            </CText>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  top: {},
  content: {
    padding: 15,
    height: '100%',
  },
  title: {
    fontFamily: FONTS.CrimsonBold,
    fontSize: 20,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
  guide: {
    justifyContent: 'space-between',
    height: '100%',
  },
});
