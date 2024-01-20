import { Dimensions, StyleSheet, View } from 'react-native';
import { CountryPill } from '@/components/Country';
import { CText } from '@/components/CText';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { FONTS, Guide, SCREENS } from '@/types';
import { useSubscription } from '@/hooks';
import Button from '@/components/Button';
import { calculateDistance } from '@/utils/map';
import { usePlayGuide } from '@/context';

import { GuidePointsList } from '../GuidePointsList/GuidePointsList';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Props = {
  guide: Guide;
};

const { height } = Dimensions.get('window');
const META_HEIGHT = height - 120;

export const GuideMeta = ({ guide }: Props) => {
  const navi = useNavigation();
  // const { currentLocation } = usePlayGuide();
  const { subscription } = useSubscription();

  // const pointsWithDistanceDelta = guide.points?.map(point => {
  //   return {
  //     ...point,
  //     distance: calculateDistance(point.coords, currentLocation),
  //   };
  // });

  const { travelTime } = guide;
  const isRenderPointsList = !!guide.points?.length && !!subscription;

  return (
    <EntityMeta
      wrapperHeight={META_HEIGHT}
      TopContent={
        <>
          <View style={styles.top}>
            {!!travelTime && <CountryPill title={travelTime} icon="clock" />}
            <CountryPill
              title={`${guide.pointsCount} points`}
              icon="map-point-small"
            />
          </View>

          <View style={styles.title}>
            <CText style={styles.aboutText}>About the guide</CText>
            <View style={styles.actions}>
              <Ionicons
                name="play-circle-outline"
                size={24}
                color="white"
                onPress={() =>
                  navi.navigate(SCREENS.GuideMap, { guideSlug: guide.slug })
                }
              />
              <SimpleLineIcons
                name="map"
                size={24}
                color="white"
                onPress={() =>
                  navi.navigate(SCREENS.GuideMap, { guideSlug: guide.slug })
                }
              />
            </View>
          </View>
        </>
      }
      BottomContent={
        <>
          {!subscription && (
            <Button
              high
              href={SCREENS.Subscriptions}
              style={{ marginBottom: 50 }}
            >
              For more info get subscription
            </Button>
          )}
          {isRenderPointsList && (
            <>
              <CText style={{ ...styles.aboutText, ...styles.pointsTitle }}>
                Guide's points
              </CText>
              <GuidePointsList points={guide.points} guide={guide} />
            </>
          )}
        </>
      }
      description={guide.description + guide.description}
    />
  );
};

const styles = StyleSheet.create({
  meta: {
    flexDirection: 'row',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginRight: 15,
  },
  pointsTitle: {
    marginTop: 10,
  },
  top: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 10,
  },
  playBtn: {
    marginTop: 10,
  },
});
