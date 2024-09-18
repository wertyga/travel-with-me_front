import { useMemo, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import CityDownloader from '@/components/City/CityDownloader/CityDownloader';
import { CityGuidesCategories } from '@/components/City/CityGuidesCategories/CityGuidesCategories';
import {
  CITY_TABS,
  getCityMetaData,
  getGuidesCategories,
} from '@/components/City/CityScreenMeta/CityScreenMeta.utils';
import { CityScreenMetaDHST } from '@/components/City/CityScreenMeta/CityScreenMetaDHST/CityScreenMetaDHST';
import { CountryPill } from '@/components/Country';
import { GuidesSlideList } from '@/components/Guide';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';

import { City, FONTS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  city: City;
};

const CityScreenMeta = ({ city }: Props) => {
  const [state, setState] = useState({
    filterByCategory: '',
    chosenCityTab: CITY_TABS[0].title,
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

  const onChangeTextData = (chosenCityTab: string) => () => {
    setState(prev => ({ ...prev, chosenCityTab }));
  };

  const guidesCityCategories = getGuidesCategories(city?.guides || []);
  const filteredGuides = !state.filterByCategory
    ? city?.guides || []
    : city?.guides.filter(({ categories }) =>
        categories.includes(state.filterByCategory)
      );

  const cityMetaInfo = useMemo(() => {
    if (!city) return {};

    return getCityMetaData(city);
  }, [city]);

  const cityTabs = CITY_TABS.filter(
    ({ title }) => !!(cityMetaInfo as any)[title]
  );

  if (!city) {
    return null;
  }

  return (
    <>
      <View style={styles.top}>
        <CountryPill title={city.country.title} icon="map-point-small" />

        <CityDownloader city={city} />
      </View>

      <ScrollHorizontalNoEdges edge={CONSTANTS.spaces.paddingHorizontal}>
        {cityTabs.map(({ title, icon }) => {
          return (
            <Button
              style={styles.aboutText}
              key={title}
              onPress={onChangeTextData(title)}
              outlined={state.chosenCityTab !== title}
            >
              {icon}
              <CText style={{ marginLeft: 5 }} light>
                {title}
              </CText>
            </Button>
          );
        })}
      </ScrollHorizontalNoEdges>

      <CityScreenMetaDHST type={state.chosenCityTab as any} city={city} />

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

export default observer(CityScreenMeta);

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
