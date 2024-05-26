import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { CityGuidesCategories } from '@/components/City/CityGuidesCategories/CityGuidesCategories';
import {
  CITY_TABS,
  getCityMetaData,
  getGuidesCategories,
} from '@/components/City/CityScreenMeta/CityScreenMeta.utils';
import { CityScreenMetaDHST } from '@/components/City/CityScreenMeta/CityScreenMetaDHST';
import { CountryPill } from '@/components/Country';
import { GuidesSlideList } from '@/components/Guide';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';
import { useNavigation } from '@/hooks';
import { City, FONTS } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  city: City;
};

export const CityScreenMeta = ({ city }: Props) => {
  const router = useRoute();
  const navi = useNavigation();

  const chosenCityTab = (router.params as any)?.cityTab || CITY_TABS[0].title;
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

  const onChangeTextData = (title: string) => () => {
    navi.setParams({ cityTab: title });
  };

  const guidesCityCategories = getGuidesCategories(city.guides);
  const filteredGuides = !state.filterByCategory
    ? city.guides
    : city.guides.filter(({ categories }) =>
        categories.includes(state.filterByCategory)
      );

  const cityMetaInfo = useMemo(() => {
    return getCityMetaData(city);
  }, [city]);

  const cityTabs = CITY_TABS.filter(({ title }) => !!cityMetaInfo[title]);

  return (
    <>
      <View style={styles.top}>
        <CountryPill title={city.country.title} />
      </View>

      <ScrollHorizontalNoEdges edge={CONSTANTS.spaces.paddingHorizontal}>
        {cityTabs.map(({ title, icon }) => {
          return (
            <Button
              style={styles.aboutText}
              key={title}
              onPress={onChangeTextData(title)}
              outlined={chosenCityTab !== title}
            >
              {icon}
              <CText style={{ marginLeft: 5 }}>{title}</CText>
            </Button>
          );
        })}
      </ScrollHorizontalNoEdges>

      <CityScreenMetaDHST type={chosenCityTab} city={city} />

      <>
        <CityGuidesCategories
          categories={guidesCityCategories}
          onCategoryPress={onChangeFilterByCategory}
          chosenCategory={state.filterByCategory}
          style={styles.categories}
        />

        <GuidesSlideList guides={filteredGuides} country={city.country.title} />
      </>
    </>
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
    marginBottom: 15,
    marginRight: 10,
  },
  aboutText_chosen: {
    textDecorationLine: 'underline',
  },
  categories: {
    marginBottom: 30,
    marginTop: 10,
  },
});
