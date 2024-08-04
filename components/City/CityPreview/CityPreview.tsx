import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CText } from '@/components/CText';
import { ImageBackgroundWithGradient } from '@/components/Common';
import { CountryPill } from '@/components/Country';
import { useNavigation } from '@/hooks';

import { getHeight } from '@/utils';

import { City, FONTS, SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  city: City;
  disabled?: boolean;
};

export const CityPreview = ({ city, disabled }: Props) => {
  const navi = useNavigation();

  return (
    <TouchableOpacity
      key={city._id}
      style={[styles.preview, disabled && styles.disabled]}
      disabled={disabled}
      onPress={() =>
        navi.navigate(SCREENS.City, {
          city,
        })
      }
    >
      <ImageBackgroundWithGradient
        image={city.image}
        style={styles.image}
        gradient="top-bottom"
        locations={[0.1, 0.2, 1]}
        isFastImage
      >
        <View style={styles.content}>
          <CountryPill
            title={city.country.title}
            style={styles.country}
            icon="map-point-small"
          />
          <CText style={styles.header}>{city.title}</CText>
        </View>
      </ImageBackgroundWithGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  preview: {
    width: '48%',
    height: getHeight(70, CONSTANTS.spaces.paddingHorizontal * 2),
    borderRadius: 15,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.3,
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
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
