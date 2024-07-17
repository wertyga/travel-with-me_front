import React, { useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { GuideMeta } from '@/components/Guide';
import { SafeLoader } from '@/components/SafeLoader';
import { ScreenContentWrapper } from '@/components/Screen';
import { useNavigation, useStores, useSubscription } from '@/hooks';

import { defaultGuideImage } from '@/utils';

import { Guide, PageScreen, SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

const GuideScreen: PageScreen<SCREENS.Guide> = ({ route }) => {
  const navi = useNavigation();
  const router = useRoute();
  const { subscription } = useSubscription();

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

  const currentGuide = (router.params as any)?.guide;

  useEffect(() => {
    if (!currentGuide?.slug) return;

    getGuide({ slug: currentGuide.slug });
  }, [currentGuide?.slug, !!subscription]);

  useEffect(() => {
    const cityId =
      typeof currentGuide?.city === 'string'
        ? currentGuide.city
        : currentGuide?.city._id;

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
  }, [currentGuide?.slug]);

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
        image={currentGuide?.vImage}
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
      headerTitle={guide.title}
      isLoading={isLoading}
      withHeaderShadow
    >
      <ScreenContentWrapper<Guide>
        data={guides}
        defaultIndex={initialGuideIndex}
        onChange={onChangeGuide}
        imageKey="vImage"
        defaultImage={defaultGuideImage}
        noDots
        isFullScreen
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
    paddingBottom: CONSTANTS.spaces.footerHeight,
  },
  guideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export default observer(GuideScreen);
