import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { CityScreenMeta } from '@/components/City/CityScreenMeta/CityScreenMeta';
import { SafeLoader } from '@/components/SafeLoader';
import { ScreenContentWrapper } from '@/components/Screen';
import { useNavigation } from '@/hooks';
import { useStores } from '@/hooks';
import { observer } from 'mobx-react';
import { City } from '@/types';

const CityScreen = () => {
  const navi = useNavigation();
  const router = useRoute();

  const { getCityLightList, getCity, cityLightList, city, isLoading } =
    useStores(stores => ({
      getCityLightList: stores.citiesListStore.getCityLightList,
      cityLightList: stores.citiesListStore.cityLightList,
      getCity: stores.cityStore.getCity,
      city: stores.cityStore.city,
      isLoading: stores.cityStore.isLoading,
    }));

  const currentCity = (router.params as any)?.city;

  const onChangeCity = async ({
    index,
    item,
  }: {
    item: City;
    index: number;
  }) => {
    if (!cityLightList[index]) return;

    navi.setParams({ cityTab: null, city: item } as any);
  };

  useEffect(() => {
    if (cityLightList.length) return;

    getCityLightList();
  }, []);

  useEffect(() => {
    if (!cityLightList.length) return;

    getCity({ slug: currentCity?.slug });
  }, [router.params?.city, cityLightList.length]);

  if (!city || !cityLightList.length) {
    return (
      <SafeLoader
        image={currentCity?.image}
        textColor="white"
        indicatorColor="white"
      />
    );
  }

  const initialCityIndex = cityLightList.findIndex(
    ({ _id }) => _id === router.params?.city._id
  );

  return (
    <MainLayout
      style={[styles.container, isLoading && { paddingBottom: 0 }]}
      headerTitle={currentCity?.title}
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
      >
        {!isLoading && <CityScreenMeta city={city} />}
      </ScreenContentWrapper>
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
