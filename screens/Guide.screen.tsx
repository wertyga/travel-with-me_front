import React, { useEffect, useState } from 'react';
import { useGetGuideQuery, useGetGuidesListQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideMeta } from '@/components/Guide';
import { defaultGuideImage, navigateToError } from '@/utils';
import { CarouselNew } from '@/components/CarouselNew/CarouselNew';
import { Guide } from '@/types';
import { StyleSheet, View } from 'react-native';
import { useSelector } from '@/stores';
import { FastImage } from '@/components/Image';
import { useHandleFromError, useNavigation } from '@/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideScreen = ({ route }: Props) => {
  const navi = useNavigation();
  const layoutHeight = useSelector(({ domStore }) => domStore?.layout?.height);
  const [defaultGuide, setDefaultGuide] = useState<Guide>(
    route.params?.guide as Guide
  );
  console.log({ defaultGuide });
  const cityId =
    typeof defaultGuide?.city === 'string'
      ? defaultGuide.city
      : defaultGuide?.city._id;

  const {
    data: guide,
    isLoading,
    isFetching,
    error: getGuideError,
  } = useGetGuideQuery(
    { slug: defaultGuide?.slug },
    { skip: !defaultGuide?.slug }
  );
  const {
    data: { guides = [] } = {},
    isLoading: isListLoading,
    error: getGuideListError,
    refetch: refetchGuidesList,
  } = useGetGuidesListQuery({ city: cityId }, { skip: !cityId });

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

  useEffect(() => {
    if (!getGuideListError) return;

    navigateToError(navi, getGuideListError);
  }, [getGuideListError]);

  useHandleFromError(refetchGuidesList, isFetching);

  if (!guide || isLoading || isListLoading) {
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
    <MainLayout headerTitle={guide.title}>
      <View style={[styles.layout, { height: layoutHeight }]}>
        <CarouselNew<Guide>
          data={guides}
          defaultIndex={initialCityIndex}
          onChange={onChangeCGuide}
          renderItem={({ item }) => {
            return (
              <FastImage
                key={item._id}
                uri={item.vImage || defaultGuideImage}
                style={styles.guideImage}
              />
            );
          }}
        />
      </View>

      <GuideMeta guide={guide} isFetching={isFetching} />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    ...StyleSheet.absoluteFillObject,
  },
  guideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export default GuideScreen;
