import React from 'react';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideMeta } from '@/components/Guide';

import DefaultGuideImage from '@/assets/images/guide_placeholder.png';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideScreen = ({ route }: Props) => {
  const { guideSlug, image } = route.params || {};

  const {
    data: guide,
    isLoading,
    isFetching,
  } = useGetGuideQuery({ slug: guideSlug }, { skip: !guideSlug });

  if (!guide || isLoading) {
    return (
      <SafeLoader image={image} textColor="white" indicatorColor="white" />
    );
  }

  const bgImageSource = guide.vImage
    ? { uri: guide.vImage }
    : DefaultGuideImage;

  return (
    <MainLayout bgImage={bgImageSource} headerTitle={guide.title}>
      <GuideMeta guide={guide} isFetching={isFetching} />
    </MainLayout>
  );
};

export default GuideScreen;
