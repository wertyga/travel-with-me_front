import { Dimensions, StyleSheet, View } from 'react-native';
import { CText } from '@/components/CText';
import { CityGuidesCategories } from '@/components/City/CityGuidesCategories/CityGuidesCategories';
import { GuidesSlideList } from '@/components/Guide';
import { CountryPill } from '@/components/Country';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { City, FONTS } from '@/types';
import { getGuidesCategories } from '@/components/City/CityScreenMeta/CityScreenMeta.utils';
import { useState } from 'react';
import { useSelector } from '@/stores';

type Props = {
  city: City;
};

export const CityScreenMeta = ({ city }: Props) => {
  const layoutHeight = useSelector(({ domStore }) => domStore?.layout?.height);

  const [state, setState] = useState({
    filterByCategory: '',
  });

  const onChangeFilterByCategory = (filterByCategory: string) => () => {
    setState(prev => {
      return {
        ...prev,
        filterByCategory:
          prev.filterByCategory === filterByCategory ? '' : filterByCategory,
      };
    });
  };

  const guidesCityCategories = getGuidesCategories(city.guides);
  const filteredGuides = !state.filterByCategory
    ? city.guides
    : city.guides.filter(({ categories }) =>
        categories.includes(state.filterByCategory)
      );

  return (
    <EntityMeta
      wrapperHeight={layoutHeight - 40}
      collapsedHeight={400}
      descriptionTextCutLines={8}
      withHeaderHide
      TopContent={
        <>
          <View style={styles.top}>
            <CountryPill title={city.country.title} />
          </View>
          <CText style={styles.aboutText}>About city</CText>
        </>
      }
      BottomContent={
        <>
          <CityGuidesCategories
            categories={guidesCityCategories}
            onCategoryPress={onChangeFilterByCategory}
            chosenCategory={state.filterByCategory}
            style={styles.categories}
          />

          <GuidesSlideList
            guides={filteredGuides}
            country={city.country.title}
            city={city}
          />
        </>
      }
      description={city.description}
    />
  );
};

const styles = StyleSheet.create({
  top: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
