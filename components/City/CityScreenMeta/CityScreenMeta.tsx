import { StyleSheet, View } from 'react-native';
import { CText } from '@/components/CText';
import Button from '@/components/Button';
import { Icon } from '@/components/Icon';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { City, FONTS } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import { CityGuidesCategories } from '@/components/City/CityGuidesCategories/CityGuidesCategories';
import { GuidesSlideList } from '@/components/Guide';
import { CountryPill } from '@/components/Country';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';

type Props = {
  city: City;
};

export const CityScreenMeta = ({ city }: Props) => {
  const allGuidesCityCategories = uniq(
    flatten(city.guides?.map(({ categories }) => categories)).filter(
      im => !!im
    ) || []
  ).map(category => ({ title: category, count: 1 }));

  return (
    <BackgroundGradient style={styles.container}>
      <View style={styles.meta}>
        <CountryPill title={city.country.title} style={styles.top} />
        <CText style={styles.aboutText}>About city</CText>
        <CText style={styles.description} numberOfLines={5}>
          {city.description}
        </CText>
      </View>

      <CityGuidesCategories
        categories={allGuidesCityCategories}
        style={styles.categories}
      />

      <GuidesSlideList guides={city.guides} country={city.country.title} />
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
  meta: {
    marginBottom: 30,
  },
  categories: {
    marginBottom: 30,
  },
});
