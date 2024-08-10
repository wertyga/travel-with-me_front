import React, { useEffect } from 'react';

import { StyleSheet } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { CityScreenMeta } from '@/components/City';
import { CityMapForDownload } from '@/components/City/CityMapForDownload/CityMapForDownload';
import { SafeLoader } from '@/components/SafeLoader';
import { ScreenContentWrapper } from '@/components/Screen';
import { useFocus, useNavigation } from '@/hooks';
import { useStores } from '@/hooks';
import _flatten from 'lodash/flatten';

import { City } from '@/types';

const CityScreen = () => {
  const navi = useNavigation();
  const router = useRoute();

  const cityFromParams = (router.params as any)?.city;

  const {
    getCityLightList,
    getCity,
    cityLightList,
    city,
    isLoading,
    isCitySaved,
    setIsCitySaved,
    cachedCity,
  } = useStores(stores => ({
    getCityLightList: stores.citiesListStore.getCityLightList,
    cityLightList: stores.citiesListStore.cityLightList,
    getCity: stores.cityStore.getCity,
    city: stores.cityStore.city,
    isLoading: stores.cityStore.isLoading,
    isCitySaved: stores.offlineStore.isCitySaved,
    setIsCitySaved: stores.offlineStore.setIsCitySaved,
    cachedCity: stores.offlineStore.getCity(cityFromParams?._id),
  }));

  const onChangeCity = async ({
    index,
    item,
  }: {
    item: City;
    index: number;
  }) => {
    if (!cityLightList[index]) return;

    navi.setParams({ city: item } as any);
  };

  useEffect(() => {
    if (cityLightList.length) return;

    getCityLightList();
  }, []);

  useEffect(() => {
    if (!cityLightList.length) return;

    getCity({ _id: cityFromParams?._id });
  }, [cityFromParams, cityLightList.length]);

  useFocus(() => {
    return () => {
      setIsCitySaved(false);
    };
  }, []);

  if (!cityLightList.length) {
    return (
      <SafeLoader
        image={cityFromParams?.image}
        textColor="white"
        indicatorColor="white"
      />
    );
  }

  const initialCityIndex = cityLightList.findIndex(
    ({ _id }) => _id === cityFromParams._id
  );
  const points = _flatten(cachedCity?.guides.map(guide => guide.points)) || [];

  return (
    <MainLayout
      style={[styles.container, isLoading && { paddingBottom: 0 }]}
      headerTitle={cityFromParams.title}
      isLoading={isLoading}
      loaderTextColor="white"
      withHeaderShadow
    >
      <ScreenContentWrapper<City>
        data={cityLightList}
        defaultIndex={initialCityIndex}
        onChange={onChangeCity}
        imageKey="image"
        noDots
        isFullScreen
        isFastImage
      >
        {!isLoading && <CityScreenMeta city={city} />}
      </ScreenContentWrapper>

      {isCitySaved && <CityMapForDownload points={points} />}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
});

export default observer(CityScreen);
