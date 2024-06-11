import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { GuideMeta } from '@/components/Guide';
import { SafeLoader } from '@/components/SafeLoader';
import { ScreenContentWrapper } from '@/components/Screen';
import { useStores } from '@/hooks';
import { defaultGuideImage } from '@/utils';
import { Guide, SCREENS } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = NativeStackScreenProps<RootStackParamList, SCREENS.Guide>;

const GuideScreen = ({ route }: Props) => {
  const [defaultGuide, setDefaultGuide] = useState<Guide>(
    route.params?.guide as Guide
  );

  const { getGuide, guide, getGuidesList, guides, isListLoading, isLoading } =
    useStores(stores => ({
      guide: stores.guideStore.guide,
      getGuide: stores.guideStore.getGuide,
      isLoading: stores.guideStore.isLoading,
      getGuidesList: stores.guidesListStore.getGuidesList,
      isListLoading: stores.guidesListStore.isLoading,
      guides: stores.guidesListStore.guides,
    }));

  const cityId =
    typeof defaultGuide?.city === 'string'
      ? defaultGuide.city
      : defaultGuide?.city._id;

  useEffect(() => {
    if (!defaultGuide?.slug) return;

    getGuide({ slug: defaultGuide.slug });
  }, [defaultGuide?.slug]);

  useEffect(() => {
    if (!cityId) return;

    getGuidesList({ city: cityId });
  }, [cityId]);

  const onChangeGuide = async ({
    index,
    item,
  }: {
    item: Guide;
    index: number;
  }) => {
    if (!guides[index]) return;

    setDefaultGuide(item);
  };

  const isInitialLoading = !guide || isLoading || isListLoading;

  if (isInitialLoading) {
    return (
      <SafeLoader
        image={defaultGuide?.vImage}
        textColor="white"
        indicatorColor="white"
      />
    );
  }

  const initialCityIndex = guides.findIndex(
    ({ _id }) => _id === route.params?.guide._id
  );

  return (
    <MainLayout
      style={styles.container}
      headerTitle={guide.title}
      withHeaderShadow
    >
      <ScreenContentWrapper<Guide>
        data={guides}
        defaultIndex={initialCityIndex}
        onChange={onChangeGuide}
        imageKey="vImage"
        defaultImage={defaultGuideImage}
        noDots
        isFullScreen
      >
        <GuideMeta guide={guide} isFetching={isLoading} />
      </ScreenContentWrapper>

      {/*<CarouselNew<Guide>*/}
      {/*  data={guides}*/}
      {/*  defaultIndex={initialCityIndex}*/}
      {/*  onChange={onChangeCGuide}*/}
      {/*  renderItem={({ item }) => {*/}
      {/*    return (*/}
      {/*      <FastImage*/}
      {/*        key={item._id}*/}
      {/*        uri={item.vImage || defaultGuideImage}*/}
      {/*        style={[styles.guideImage]}*/}
      {/*      />*/}
      {/*    );*/}
      {/*  }}*/}
      {/*  isFullScreen*/}
      {/*  noDots*/}
      {/*/>*/}

      {/*<GuideMeta guide={guide} isFetching={isFetching} />*/}
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
