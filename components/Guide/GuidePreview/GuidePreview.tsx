import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CText } from '@/components/CText';
import { ImageBackgroundWithGradient } from '@/components/Common';
import { CountryPill } from '@/components/Country';
import { MEDIA_SIZES } from '@/components/FastImage/FastImage';
import { useNavigation } from '@/hooks';

import { FONTS, Guide, SCREENS } from '@/types';

type Props = {
  guide: Guide;
  containerClassName?: string;
  country: string;
};

const WIDTH = Dimensions.get('window').width * 0.7;

export const GuidePreview = ({ guide, country }: Props) => {
  const navi = useNavigation();

  const navigateToGuide = () => {
    navi.navigate(SCREENS.Guide, {
      guide,
    });
  };

  return (
    <ImageBackgroundWithGradient
      gradient="top-bottom"
      style={styles.container}
      image={guide.hImage}
      contentStyle={styles.content}
      isFastImage
      mediaSize={MEDIA_SIZES.Big}
    >
      <TouchableOpacity
        onPress={navigateToGuide}
        activeOpacity={1}
        style={styles.guide}
      >
        <CountryPill title={country} />

        <View>
          <CText style={styles.title} light>
            {guide.title}
          </CText>
          {!!guide.pointsCount && <Text>{guide.pointsCount}</Text>}

          <CText numberOfLines={3} style={styles.description} light>
            {guide.description}
          </CText>
        </View>
      </TouchableOpacity>
    </ImageBackgroundWithGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    aspectRatio: 1,
    borderRadius: 20,
    marginRight: 10,
    overflow: 'hidden',
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
