import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideMap, GuideMeta } from '@/components/Guide';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { getCompressedUrl } from '@/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideScreen = ({ route }: Props) => {
  const { guideSlug } = route.params || {};
  const navi = useNavigation();

  const { data: guide, isFetching } = useGetGuideQuery(
    { slug: guideSlug },
    { skip: !guideSlug }
  );

  const goToMap = () => {
    navi.navigate('GuideMap', { guideSlug: guide.slug });
  };

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  if (!guide || isFetching) {
    return <SafeLoader />;
  }

  return (
    <MainLayout
      bgImage={getCompressedUrl(guide.vImage, Dimensions.get('screen').width)}
      headerTitle={guide.title}
    >
      {/*<CityScreenHeader title={guide.title} />*/}

      <GuideMeta guide={guide} />
    </MainLayout>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({});
