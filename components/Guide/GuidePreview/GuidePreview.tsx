import {
  View,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS, Guide, SCREENS } from '@/types';
import { getCurrencyMeta } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import DefaultImage from '@/assets/images/default_point_image.png';
import { CText } from '@/components/CText';
import Button from '@/components/Button';
import { Icon } from '@/components/Icon';
import { CountryPill } from '@/components/Country';

type Props = {
  guide: Guide;
  containerClassName?: string;
  country: string;
};

export const GuidePreview = ({ guide, country }: Props) => {
  const navi = useNavigation();

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={
        guide.hImage
          ? {
              uri: guide.hImage,
            }
          : DefaultImage
      }
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.3)']}
        style={styles.content}
      >
        <TouchableOpacity
          onPress={() =>
            navi.navigate(SCREENS.Guide, { guideSlug: guide.slug })
          }
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

const width = Dimensions.get('screen').width * 0.7;

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
