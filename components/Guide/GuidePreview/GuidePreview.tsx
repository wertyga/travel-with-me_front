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
import { useNavigation } from '@/hooks';

import { defaultGuideImage } from '@/utils';

import { FONTS, Guide, SCREENS } from '@/types';

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
      guide,
    });
  };

  return (
    <ImageBackgroundWithGradient
      gradient="top-bottom"
      style={styles.container}
      image={guide.hImage || defaultGuideImage}
      contentStyle={styles.content}
      isFastImage
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
    </ImageBackgroundWithGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
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
