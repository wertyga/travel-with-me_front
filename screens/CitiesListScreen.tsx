import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { useGetCitiesLightListQuery } from '@/api';
import { MainLayout } from '@/Layouts';
import { useNavigation } from '@react-navigation/native';
import { CText } from '@/components/CText';
import { CityPreview } from '@/components/City';
import Search from '@/components/Search';
import { Loader } from '@/components/Loader';
import { navigateToError } from '@/utils';
import { useHandleFromError } from '@/hooks';
import { FONTS, SCREENS } from '@/types';

import citiesBgImage from '@/assets/images/cities-bg2.png';
import { CONSTANTS } from '@/styles/constants';

const CitiesListScreen = ({ route }) => {
  const navi = useNavigation();
  const [search, setSearch] = useState('');

  const {
    data: { cities = [] } = {},
    isFetching,
    error,
    refetch: refetchCities,
  } = useGetCitiesLightListQuery();

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (!error) return;

    navigateToError(navi, error);
  }, [error, cities]);

  useHandleFromError(route, refetchCities, isFetching);

  const filteredCities = search
    ? cities.filter(({ title, country }) => {
        return (
          new RegExp(search, 'i').test(title) ||
          new RegExp(search, 'i').test(country.title)
        );
      })
    : cities;

  return (
    <MainLayout style={styles.layout} bgImage={citiesBgImage}>
      <Search
        inputProps={{
          placeholder: "I'm looking for...",
          onChangeText: setSearch,
          value: search,
        }}
      />
      <ScrollView>
        <CText style={styles.header}>Cities</CText>
        <View style={styles.list}>
          {filteredCities.map(city => {
            return (
              <TouchableOpacity
                key={city._id}
                style={styles.preview}
                onPress={() => navi.navigate(SCREENS.Home, { city })}
              >
                <CityPreview city={city} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {isFetching && <Loader />}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: CONSTANTS.spaces.paddingTop,
  },
  header: {
    fontSize: 30,
    marginBottom: 15,
    marginTop: 20,
    fontFamily: FONTS.CrimsonBold,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    paddingBottom: 20,
  },
  preview: {
    width: '46%',
  },
});

export default CitiesListScreen;
