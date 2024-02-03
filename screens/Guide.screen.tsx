import React, { useMemo } from 'react';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideMeta } from '@/components/Guide';
import { CText } from '@/components/CText';
import Button from '@/components/Button';

import DefaultGuideImage from '@/assets/images/guide_placeholder.png';
import { SCREENS } from '@/types';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { CountryPill } from '@/components/Country';
import { StyleSheet } from 'react-native';
import { useSubscription } from '@/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideScreen = ({ route }: Props) => {
  const { subscription } = useSubscription();
  const { guideSlug } = route.params || {};

  const {
    data: guide,
    isLoading,
    isFetching,
  } = useGetGuideQuery({ slug: guideSlug }, { skip: !guideSlug });

  // const menu = useMemo(() => {
  //   if (!guide || !subscription) return undefined;
  //
  //   return [
  //     {
  //       title: (
  //         <Button
  //           textable
  //           style={styles.menuAction}
  //           href={SCREENS.GuideMap}
  //           hrefParams={{ guideSlug: guide.slug }}
  //         >
  //           <Ionicons
  //             name="play-circle-outline"
  //             size={24}
  //             color="white"
  //             style={{ marginRight: 10 }}
  //           />
  //           <CText>Play and follow guide</CText>
  //         </Button>
  //       ),
  //     },
  //     {
  //       title: (
  //         <Button
  //           textable
  //           style={styles.menuAction}
  //           href={SCREENS.GuideMap}
  //           hrefParams={{ guideSlug: guide.slug, isOnlyMap: true }}
  //         >
  //           <SimpleLineIcons
  //             name="map"
  //             size={22}
  //             color="white"
  //             style={{ marginRight: 10 }}
  //           />
  //           <CText>Open map</CText>
  //         </Button>
  //       ),
  //     },
  //   ];
  // }, [guide, subscription]);

  if (!guide || isLoading) {
    return <SafeLoader />;
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

const styles = StyleSheet.create({
  menuAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default GuideScreen;
