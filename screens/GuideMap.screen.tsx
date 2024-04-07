import * as React from 'react';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideMap } from '@/components/Guide';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useAuthGuard } from '@/hooks';
import {
  onStopWatchLocation,
  dropGuideStoreStateAction,
  onStartWatchingAction,
  toggleGuideMute,
  updateFollowingGuideState,
} from '@/stores';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideMapScreen = ({ route }: Props) => {
  useAuthGuard();
  const navi = useNavigation();

  const { data: guide, isLoading } = useGetGuideQuery(
    { slug: route.params?.guideSlug, withStory: true },
    { skip: !route.params?.guideSlug }
  );

  useLayoutEffect(() => {
    if (!route.params?.guideSlug) {
      Toast.show({
        type: 'error',
        text1: 'No guide slug was provided',
      });
      navi.goBack();
    }

    toggleGuideMute(!!route.params?.isOnlyMap);
  }, []);

  useEffect(() => {
    if (guide) {
      onStartWatchingAction(guide);

      if (guide && !route.params?.isOnlyMap) {
        updateFollowingGuideState(true);
      }
    }
  }, [guide]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        onStopWatchLocation();
        dropGuideStoreStateAction();
      };
    }, [])
  );

  if (!guide || isLoading) {
    return <SafeLoader />;
  }

  return (
    <MainLayout headerTitle={guide.title} bgImage={guide.vImage} noFooter>
      <GuideMap guide={guide} />
    </MainLayout>
  );
};

export default GuideMapScreen;
