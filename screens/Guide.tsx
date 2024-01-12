import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideMap, GuideMeta } from '@/components/Guide';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { getCompressedUrl } from '@/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideScreen = ({ route, navigation }: Props) => {
  const { guideSlug } = route.params || {};
  const navi = useNavigation();

  const { data: guide, isFetching } = useGetGuideQuery(
    { slug: guideSlug },
    { skip: !guideSlug }
  );

  const goToMap = () => {
    navi.navigate('GuideMap', { guideSlug: guide.slug });
  };

  if (!guide || isFetching) {
    return <SafeLoader />;
  }

  return (
    <MainLayout
      bgImage={getCompressedUrl(guide.vImage, Dimensions.get('screen').width)}
      headerTitle={guide.title}
    >
      <GuideMeta guide={guide} />
    </MainLayout>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({});
