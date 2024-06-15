import * as React from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { observer } from 'mobx-react-lite';
import { MainLayout } from '@/Layouts';
import { GuideMap } from '@/components/Guide';
import { SafeLoader } from '@/components/SafeLoader';
import {
  useAuthGuard,
  useFocus,
  useStores,
  useSubscriptionGuard,
} from '@/hooks';
import { showNotification } from '@/utils';
import { Place } from '@/types';
import { CONSTANTS } from '@/styles/constants';

const GuideMapScreen = ({ route }) => {
  useAuthGuard();
  useSubscriptionGuard();

  const navi = useNavigation();
  const {
    getGuide,
    guide,
    onStartWatchingLocation,
    updateGuidePointWithLiveCoords,
    dropLocationStore,
    dropFollowingGuide,
    toggleMuteGuideSound,
    setIsFollowingGuide,
  } = useStores(stores => ({
    getGuide: stores.guideStore.getGuide,
    guide: stores.guideStore.guide,
    onStartWatchingLocation: stores.locationStore.onStartWatchingLocation,
    dropLocationStore: stores.locationStore.dropStore,
    dropFollowingGuide: stores.guideStore.dropFollowingGuide,
    toggleMuteGuideSound: stores.guideStore.toggleMuteGuideSound,
    setIsFollowingGuide: stores.guideStore.setIsFollowingGuide,
    updateGuidePointWithLiveCoords:
      stores.guideStore.updateGuidePointWithLiveCoords,
  }));

  const watchingLocationCallback = () => {
    if (route.params?.isOnlyMap) return;
    updateGuidePointWithLiveCoords(guide);
  };

  useLayoutEffect(() => {
    if (!route.params?.guide) {
      Toast.show({
        type: 'error',
        text1: 'No guide was provided',
      });
      navi.goBack();
    }

    toggleMuteGuideSound(!!route.params?.isOnlyMap);

    getGuide({ slug: route.params?.guide?.slug, withStory: true });
  }, []);

  useEffect(() => {
    if (!guide) return;

    setIsFollowingGuide(!route.params?.isOnlyMap);
    onStartWatchingLocation(watchingLocationCallback);
  }, [guide]);

  useFocus(() => {
    return () => {
      dropLocationStore();
      dropFollowingGuide();
    };
  });

  if (!guide) {
    return <SafeLoader />;
  }

  return (
    <MainLayout headerTitle={guide.title} bgImage={guide.vImage} noFooter>
      <GuideMap guide={guide} />
    </MainLayout>
  );
};

export default observer(GuideMapScreen);
