import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainLayout } from '@/Layouts';
import { useGetGuideQuery, useGetGuidesListQuery } from '@/api';
import { RootStackParamList } from '@/app/Navigator';
import { CarouselNew } from '@/components/CarouselNew/CarouselNew';
import { GuideMeta } from '@/components/Guide';
import { FastImage } from '@/components/Image';
import { SafeLoader } from '@/components/SafeLoader';
import { defaultGuideImage } from '@/utils';
import { Guide, SCREENS } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, SCREENS.Guide>;

const GuideScreen = ({ route }: Props) => {
  const [defaultGuide, setDefaultGuide] = useState<Guide>(
    route.params?.guide as Guide
  );

  const cityId =
    typeof defaultGuide?.city === 'string'
      ? defaultGuide.city
      : defaultGuide?.city._id;

  const {
    data: guide,
    isLoading,
    isFetching,
    error: getGuideError,
    refetch: refetchGuide,
  } = useGetGuideQuery(
    { slug: defaultGuide?.slug },
    { skip: !defaultGuide?.slug }
  );
  const { data: { guides = [] } = {}, isLoading: isListLoading } =
    useGetGuidesListQuery({ city: cityId }, { skip: !cityId });

  const onChangeCGuide = async ({
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
        reFetchMethod={refetchGuide}
        fetchError={getGuideError}
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
      headerTitle={guide.title}
      reFetchMethod={refetchGuide}
      fetchError={getGuideError}
    >
      <CarouselNew<Guide>
        data={guides}
        defaultIndex={initialCityIndex}
        onChange={onChangeCGuide}
        renderItem={({ item }) => {
          return (
            <FastImage
              key={item._id}
              uri={item.vImage || defaultGuideImage}
              style={[styles.guideImage]}
            />
          );
        }}
        isFullScreen
        noDots
      />

      <GuideMeta guide={guide} isFetching={isFetching} />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  guideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export default GuideScreen;
