import * as React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useGetMySubscriptionQuery,
  useLazyGetGuideQuery,
  useGetGuideQuery,
} from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideShallowOverview } from '@/components/Guide/GuideShallowOverview/GuideShallowOverview';
import { CONSTANTS } from '@/styles/constants';
import { GuideMap } from '@/components/Guide';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useAuth } from '@/context';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { GuideMeta } from '@/components/Guide/GuideMEta/GuideMeta';
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
    >
      <CityScreenHeader title={guide.title} />

      <GuideMeta guide={guide} />
    </MainLayout>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({});
