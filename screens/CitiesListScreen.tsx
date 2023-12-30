import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useGetCitiesLightListQuery } from '@/api';
import { MainLayout } from '@/Layouts';
import { useNavigation } from '@react-navigation/native';
import { CText } from '@/components/CText';
import { CityPreview } from '@/components/City';
import Search from '@/components/Search';
import { Loader } from '@/components/Loader';
import { navigateToError } from '@/utils';
import { useHandleFromError } from '@/hooks';
import { City, FONTS } from '@/types';
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import { TextInputTextInputEventData } from 'react-native/Libraries/Components/TextInput/TextInput';

const CitiesListScreen = ({ route }) => {
  const navi = useNavigation();
  const [search, setSearch] = useState('');
  const [state, setState] = useState<{ cities: City[] }>({
    cities: [],
  });

  const {
    data: { cities = [] } = {},
    isFetching,
    error,
    refetch: refetchCities,
  } = useGetCitiesLightListQuery();

  const onSearch = ({
    value,
  }: NativeSyntheticEvent<TextInputTextInputEventData>) => {
    console.log({ value });
    setSearch(value);
  };

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setState(prev => ({ ...prev, cities: cities }));
  }, [cities]);

  useEffect(() => {
    if (!error) return;

    navigateToError(navi, error);
  }, [error, cities]);

  useHandleFromError(route, refetchCities, isFetching);

  const filteredCities = search
    ? state.cities.filter(({ title, country }) => {
        return (
          new RegExp(search, 'i').test(title) ||
          new RegExp(search, 'i').test(country.title)
        );
      })
    : state.cities;
  return (
    <MainLayout style={styles.layout}>
      <Search
        inputProps={{
          placeholder: "I'm looking for...",
          onChangeText: setSearch,
          value: search,
        }}
      />
      <CText style={styles.header}>Cities</CText>
      {isFetching && <Loader />}
      <ScrollView contentContainerStyle={styles.list}>
        {filteredCities.map(city => {
          return (
            <TouchableOpacity
              key={city._id}
              style={styles.preview}
              onPress={() => navi.navigate('Home', { city })}
            >
              <CityPreview city={city} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: 50,
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
    width: '46.9%',
  },
});

export default CitiesListScreen;
