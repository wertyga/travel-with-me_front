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
  showNotification,
  removeNotification,
  getNotificationAsync,
} from '@/stores';
import { store } from '@/app/store/create-isomorphic-store';
import { calculateDistance } from '@/utils/map';
import { startWatchToLiveLocationInBackground } from '@/utils';
import {
  getTheNearestVisiblePoint,
  NearestPoint,
} from '@/stores/guide/guide.utils';
import { Path, Place } from '@/types';
import { showPointDistanceNotification } from '@/stores/notify/notify.actions';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideMapScreen = ({ route }: Props) => {
  useAuthGuard();

  const navi = useNavigation();

  const { data: guide, isLoading } = useGetGuideQuery(
    { slug: route.params?.guide?.slug, withStory: true },
    { skip: !route.params?.guide?.slug }
  );

  const onPressGoToPointDirections = async (point: Place) => {
    const hasAccess = await startWatchToLiveLocationInBackground(
      async (liveCoords: Path) => {
        const prevNot = await getNotificationAsync(point._id);

        const visiblePoint = getTheNearestVisiblePoint(
          [point],
          liveCoords,
          (prevNot?.content?.data || undefined) as NearestPoint
        );
        showPointDistanceNotification(visiblePoint, visiblePoint);

        // DOESN'T PLAY, DON'T KNOW WHY
        //   if (visiblePoint.becameVisible) {
        //     const audio = require('assets/Amsterdam_Dungeon.mp3');
        //     console.log({ audio });
        //     await removeNotification(`${point._id}_audio`);
        //     await showNotification({
        //       identifier: `${point._id}_audio`,
        //       content: {
        //         title: point.title,
        //         body: !point.audioStory ? 'You have reached the point' : undefined,
        //         // sound: 'assets/Amsterdam_Dungeon.mp3',
        //         sound: point.audioStory,
        //       },
        //     });
        //   } else if (visiblePoint.becameVisible === false) {
        //     await removeNotification(`${point._id}_audio`);
        //   }
      }
    );

    if (hasAccess) {
      const liveCords = store.getState().locationStore.liveCoords;
      const distance = calculateDistance(
        point.coords,
        liveCords,
        true
      ) as number;
      showPointDistanceNotification({
        point,
        distance,
      });
    }
  };

  useLayoutEffect(() => {
    if (!route.params?.guide) {
      Toast.show({
        type: 'error',
        text1: 'No guide was provided',
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
      <GuideMap
        guide={guide}
        onPressGoToPointDirections={onPressGoToPointDirections}
      />
    </MainLayout>
  );
};

export default GuideMapScreen;
