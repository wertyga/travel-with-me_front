import * as React from 'react';
import { useLayoutEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { GuideMap } from '@/components/Guide';
import { PermissionRequestPopup } from '@/components/Location/PermissionRequestPopup';
import { SafeLoader } from '@/components/SafeLoader';
import {
  useAuthGuard,
  useFocus,
  useStores,
  useSubscriptionGuard,
} from '@/hooks';

import { PageScreen, SCREENS } from '@/types';

const GuideMapScreen: PageScreen<SCREENS.GuideMap> = ({ route }) => {
  useAuthGuard();
  useSubscriptionGuard();

  const navi = useNavigation();
  const {
    getGuide,
    guide,
    updateGuidePointWithLiveCoords,
    dropLocationStore,
    dropFollowingGuide,
    toggleMuteGuideSound,
    setIsFollowingGuide,
    requestForWatchingLocation,
  } = useStores(stores => ({
    getGuide: stores.guideStore.getGuide,
    guide: stores.guideStore.guide,
    onStartWatchingLocation: stores.locationStore.onStartWatchingLocation,
    dropLocationStore: stores.locationStore.dropStore,
    requestForWatchingLocation: stores.locationStore.requestForWatchingLocation,
    dropFollowingGuide: stores.guideStore.dropFollowingGuide,
    toggleMuteGuideSound: stores.guideStore.toggleMuteGuideSound,
    setIsFollowingGuide: stores.guideStore.setIsFollowingGuide,
    updateGuidePointWithLiveCoords:
      stores.guideStore.updateGuidePointWithLiveCoords,
  }));

  const watchingLocationCallback = () => {
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

  useFocus(() => {
    if (!guide) return;

    setIsFollowingGuide(!route.params?.isOnlyMap);
  }, [guide]);

  useFocus(() => {
    requestForWatchingLocation(watchingLocationCallback);

    return () => {
      dropLocationStore();
      dropFollowingGuide();
    };
  }, []);

  if (!guide) {
    return <SafeLoader />;
  }

  return (
    <MainLayout
      headerTitle={guide.title}
      bgImage={guide.vImage}
      numberOfLinesTitle={1}
      noFooter
      isHeaderDark
    >
      <PermissionRequestPopup />
      <GuideMap guide={guide} />
    </MainLayout>
  );
};

export default observer(GuideMapScreen);
