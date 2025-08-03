import React, { useMemo, useState } from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { AviaMonthPrice } from '@/components/Avia/AviaMonthPrice';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
// import CityDownloader from '@/components/City/CityDownloader/CityDownloader';
import {
  CITY_TABS,
  getCityMetaData,
} from '@/components/City/CityScreenMeta/CityScreenMeta.utils';
import { CityScreenMetaDHST } from '@/components/City/CityScreenMeta/CityScreenMetaDHST/CityScreenMetaDHST';
import { CountryPill } from '@/components/Country';
import { GuidesSlideList } from '@/components/Guide';
// import { DonationBtn } from '@/components/Payment/DonationBtn/DonationBtn';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';

import { City, FONTS } from '@/types';

import { CONSTANTS, CUSTOM_VIEW_STYLES } from '@/styles/constants';

type Props = {
  city: City;
};

const CityScreenMeta = ({ city }: Props) => {
  const [state, setState] = useState({
    filterByCategory: '',
    chosenCityTab: '',
  });

  // const onChangeFilterByCategory = (filterByCategory: string) => () => {
  //   setState(prev => {
  //     return {
  //       ...prev,
  //       filterByCategory:
  //         prev.filterByCategory === filterByCategory ? '' : filterByCategory,
  //     };
  //   });
  // };

  const onChangeTextData = (chosenCityTab: string) => () => {
    const isTheSame = chosenCityTab === state.chosenCityTab;
    setState(prev => ({
      ...prev,
      chosenCityTab: isTheSame ? '' : chosenCityTab,
    }));
  };

  // const guidesCityCategories = getGuidesCategories(city?.guides || []);
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
    <View style={styles.container}>
      <View style={styles.top}>
        <CountryPill
          title={city.country.title}
          customIcon={<Text>{city.country.flag}</Text>}
          contentStyle={styles.countryPill}
          rectangle
        />

        {/*<CityDownloader city={city} />*/}
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
      {/*<DonationBtn />*/}
      <CityScreenMetaDHST type={state.chosenCityTab as any} city={city} />

      <>
        {/*<CityGuidesCategories*/}
        {/*  categories={guidesCityCategories}*/}
        {/*  onCategoryPress={onChangeFilterByCategory}*/}
        {/*  chosenCategory={state.filterByCategory}*/}
        {/*  style={styles.categories}*/}
        {/*/>*/}

        <GuidesSlideList
          guides={filteredGuides}
          country={city.country.title}
          title="Free self tours"
        />

        <AviaMonthPrice
          destinationCity={city.title}
          style={{
            marginTop: 15,
          }}
        />
      </>
    </View>
  );
};

export default observer(CityScreenMeta);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 40,
    paddingHorizontal: CONSTANTS.spaces.paddingHorizontal,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: -20,
    width: Dimensions.get('window').width,
    paddingHorizontal: CONSTANTS.spaces.paddingHorizontal,
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
  countryPill: {
    ...CUSTOM_VIEW_STYLES.metaView.cityPill,
  },
});
