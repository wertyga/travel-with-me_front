import { StyleSheet, TouchableOpacity } from 'react-native';
import { CText } from '@/components/CText';
import { ImageBackgroundWithGradient } from '@/components/Common';
import { CountryPill } from '@/components/Country';
import { FastImage } from '@/components/FastImage';
import { useNavigation } from '@/hooks';
import { getHeight } from '@/utils';
import { City, FONTS, SCREENS } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  city: City;
};

export const CityPreview = ({ city }: Props) => {
  const navi = useNavigation();

  return (
    <TouchableOpacity
      key={city._id}
      style={styles.preview}
      onPress={() =>
        navi.navigate(SCREENS.City, {
          city,
        })
      }
    >
      <ImageBackgroundWithGradient
        image={city.image}
        contentStyle={styles.content}
        gradient="top-bottom"
        isFastImage
      >
        <CountryPill
          title={city.country.title}
          style={styles.country}
          icon="map-point-small"
        />
        <CText style={styles.header}>{city.title}</CText>
      </ImageBackgroundWithGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: getHeight(70, CONSTANTS.spaces.paddingHorizontal * 2),
    borderRadius: 15,
    overflow: 'hidden',
  },
  header: {
    fontSize: 22,
    fontFamily: FONTS.CrimsonSemiBold,
  },
  country: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  countryText: {
    marginLeft: 5,
    fontSize: 12,
  },
  content: {
    padding: 10,
  },
});
