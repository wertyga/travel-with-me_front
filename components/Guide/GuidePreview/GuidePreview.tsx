import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS, Guide, SCREENS } from '@/types';
import { useNavigation } from '@/hooks';
import { CText } from '@/components/CText';
import { FastImageBackground } from '@/components/Image';
import { CountryPill } from '@/components/Country';
import { defaultGuideImageUri, defaultGuideImage } from '@/utils';

type Props = {
  guide: Guide;
  containerClassName?: string;
  country: string;
};

const width = Dimensions.get('window').width * 0.7;

export const GuidePreview = ({ guide, country }: Props) => {
  const navi = useNavigation();

  const navigateToGuide = () => {
    navi.navigate(SCREENS.Guide, {
      guideSlug: guide.slug,
      image: guide.vImage,
    });
  };

  return (
    <FastImageBackground
      resizeMode="cover"
      style={styles.container}
      uri={guide.hImage || defaultGuideImage}
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
    </FastImageBackground>
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
