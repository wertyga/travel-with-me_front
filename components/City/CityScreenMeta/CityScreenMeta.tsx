import { StyleSheet, View } from 'react-native';
import { CText } from '@/components/CText';
import Button from '@/components/Button';
import { Icon } from '@/components/Icon';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { City, FONTS } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  city: City;
};

export const CityScreenMeta = ({ city }: Props) => {
  return (
    <BackgroundGradient style={styles.container}>
      <View style={styles.top}>
        <Button>
          <Icon name="map-point-small" color="white" />
          <CText style={styles.country}>{city.country.title}</CText>
        </Button>
      </View>
      <CText style={styles.aboutText}>About city</CText>
      <CText style={styles.description} numberOfLines={5}>
        {city.description}
      </CText>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.colors.bg2,
    paddingHorizontal: 15,
    paddingVertical: 25,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 80,
    width: '100%',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  country: {
    fontFamily: FONTS.OpenSansSemiBold,
    marginLeft: 10,
  },
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginBottom: 15,
  },
  description: {
    lineHeight: 22,
  },
});
