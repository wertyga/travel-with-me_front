import { Dimensions, StyleSheet } from 'react-native';
import { CText } from '@/components/CText';
import { CityGuidesCategories } from '@/components/City/CityGuidesCategories/CityGuidesCategories';
import { GuidesSlideList } from '@/components/Guide';
import { CountryPill } from '@/components/Country';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { City, FONTS } from '@/types';
import { useLayout } from '@/context';

type Props = {
  city: City;
};

export const CityScreenMeta = ({ city }: Props) => {
  const { height } = useLayout();

  const allGuidesCityCategories = uniq(
    flatten(city.guides?.map(({ categories }) => categories)).filter(
      im => !!im
    ) || []
  ).map(category => ({ title: category, count: 1 }));

  return (
    <EntityMeta
      wrapperHeight={height - 40}
      TopContent={
        <>
          <CountryPill title={city.country.title} style={styles.top} />
          <CText style={styles.aboutText}>About city</CText>
        </>
      }
      BottomContent={
        <>
          <CityGuidesCategories
            categories={allGuidesCityCategories}
            style={styles.categories}
          />

          <GuidesSlideList guides={city.guides} country={city.country.title} />
        </>
      }
      description={city.description}
    />
  );
};

const styles = StyleSheet.create({
  top: {
    marginBottom: 15,
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
  categories: {
    marginBottom: 30,
    marginTop: 10,
  },
});
