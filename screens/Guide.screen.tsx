import React, { useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { GuideMeta } from '@/components/Guide';
import { SafeLoader } from '@/components/SafeLoader';
import { ScreenContentWrapper } from '@/components/Screen';
import { useNavigation, useStores } from '@/hooks';

import { Guide, PageScreen, SCREENS } from '@/types';

const GuideScreen: PageScreen<SCREENS.Guide> = ({ route }) => {
  const navi = useNavigation();
  const router = useRoute();

  const [guides, setGuides] = useState([]);
  const [fetchedCityId, setFetchedCityId] = useState('');

  const { getGuide, guide, isLoading, getCity, isCityLoading } = useStores(
    stores => ({
      guide: stores.guideStore.guide,
      getGuide: stores.guideStore.getGuide,
      isLoading: stores.guideStore.isLoading,
      getCity: stores.cityStore.getCity,
      isCityLoading: stores.cityStore.isLoading,
    })
  );

  const guideFromParams = (router.params as any)?.guide;
  useEffect(() => {
    if (!guideFromParams?.slug) return;

    getGuide({ slug: guideFromParams.slug });
  }, [guideFromParams?.slug]);

  useEffect(() => {
    const cityId =
      typeof guideFromParams?.city === 'string'
        ? guideFromParams.city
        : guideFromParams?.city._id;

    if (fetchedCityId === cityId) {
      return;
    }

    const getCityGuides = async () => {
      try {
        const city = await getCity({ _id: cityId });

        setGuides(city.guides);
        setFetchedCityId(city._id);
      } catch (e) {}
    };

    getCityGuides();
  }, [guideFromParams?.slug]);

  const onChangeGuide = async ({
    index,
    item,
  }: {
    item: Guide;
    index: number;
  }) => {
    if (!guides[index]) return;

    navi.setParams({ guide: item });
  };

  if (!guide) {
    return (
      <SafeLoader
        image={guideFromParams?.vImage}
        textColor="white"
        indicatorColor="white"
      />
    );
  }

  const initialGuideIndex = guides.findIndex(
    ({ _id }) => _id === route.params?.guide._id
  );
  const loading = isLoading || isCityLoading;

  return (
    <MainLayout
      style={styles.container}
      headerTitle={guideFromParams.title}
      isLoading={isLoading}
      withHeaderShadow
    >
      <ScreenContentWrapper<Guide>
        data={guides}
        defaultIndex={initialGuideIndex}
        onChange={onChangeGuide}
        imageKey="vImage"
        noDots
        isFullScreen
        isFastImage
      >
        {!loading && <GuideMeta guide={guide} />}
      </ScreenContentWrapper>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  guideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export default observer(GuideScreen);
