import * as React from 'react';
import { useEffect, useLayoutEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { GuideMap } from '@/components/Guide';
import { SafeLoader } from '@/components/SafeLoader';
import { useAuthGuard, useFocus, useStores } from '@/hooks';

import { PageScreen, SCREENS } from '@/types';

const GuideMapScreen: PageScreen<SCREENS.GuideMap> = ({ route }) => {
  useAuthGuard();
  const navi = useNavigation();

  const { getGuide, guide, setIsFollowingGuide, onStartWatchingLocation } =
    useStores(stores => ({
      getGuide: stores.guideStore.getGuide,
      guide: stores.guideStore.guide,
      setIsFollowingGuide: stores.guideStore.setIsFollowingGuide,
      onStartWatchingLocation: stores.locationStore.onStartWatchingLocation,
    }));

  useLayoutEffect(() => {
    if (!route.params?.guide) {
      Toast.show({
        type: 'error',
        text1: 'No guide was provided',
      });
      navi.goBack();
    }
    onStartWatchingLocation();
    getGuide({ slug: route.params?.guide?.slug, withStory: true });
  }, []);

  useEffect(() => {
    setIsFollowingGuide(true);
  }, [guide]);

  useFocus(() => {
    return () => {
      setIsFollowingGuide(false);
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
      <GuideMap guide={guide} />
    </MainLayout>
  );
};

export default observer(GuideMapScreen);
