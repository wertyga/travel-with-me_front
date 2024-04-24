import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { City, FONTS, Guide, SCREENS } from '@/types';
import { useNavigation } from '@/hooks';
import { CText } from '@/components/CText';
import { CountryPill } from '@/components/Country';
import { defaultGuideImage } from '@/utils';

type Props = {
  guide: Guide;
  city: City;
  containerClassName?: string;
  country: string;
};

const width = Dimensions.get('window').width * 0.7;

export const GuidePreview = ({ guide, country, city }: Props) => {
  const navi = useNavigation();

  const navigateToGuide = () => {
    navi.navigate(SCREENS.Guide, {
      guide,
      city,
    });
  };

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={guide.hImage ? { uri: guide.hImage } : defaultGuideImage}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
        start={{
          x: 0.5,
          y: 0.6,
        }}
        style={styles.content}
      >
        <TouchableOpacity
          onPress={navigateToGuide}
          activeOpacity={1}
          style={styles.guide}
        >
          <CountryPill title={country} />

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
