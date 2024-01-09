import { View, StyleSheet, ViewStyle } from 'react-native';
import { CText } from '@/components/CText';
import { Icon } from '@/components/Icon';
import { Image } from '@/components/Image';
import { City, FONTS } from '@/types';

type Props = {
  city: City;
  style?: ViewStyle;
};

export const CityPreview = ({ city, style }: Props) => {
  return (
    <View style={style}>
      <Image uri={city.image} width={200} style={styles.image} />
      <View>
        <CText style={styles.header}>{city.title}</CText>
        <View style={styles.country}>
          <Icon name="map-point-small" />
          <CText style={styles.countryText}>{city.country.title}</CText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    marginBottom: 8,
    fontFamily: FONTS.CrimsonSemiBold,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryText: {
    marginLeft: 5,
    fontSize: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 0.825,
    borderRadius: 15,
    marginBottom: 8,
    objectFit: 'cover',
  },
});
