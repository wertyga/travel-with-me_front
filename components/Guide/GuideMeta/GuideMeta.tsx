import { StyleSheet, View } from 'react-native';
import { CountryPill } from '@/components/Country';
import { CText } from '@/components/CText';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { FONTS, Guide, Place, SCREENS } from '@/types';
import { useSubscription } from '@/hooks';
import Button from '@/components/Button';
import { GuidePointsList } from '../GuidePointsList/GuidePointsList';
import { GuidePlayBtn } from '@/components/Guide/GuidePlayBtn/GuidePlayBtn';
import { useState } from 'react';
import { calculateDistance, getNearestCoords } from '@/utils/map';
import { usePlayGuide } from '@/context';

type Props = {
  guide: Guide;
};

const META_HEIGHT = 550;

const MY_LOC = {
  lat: 52.308684,
  lng: 21.058919,
};

export const GuideMeta = ({ guide }: Props) => {
  const { currentLocation } = usePlayGuide();
  const [state, setState] = useState<{ nearestPoint?: Place }>({});
  const { subscription } = useSubscription();

  const guidesWithDistanceDelta = guide.points?.map(point => {
    return {
      ...point,
      distance: calculateDistance(point.coords, currentLocation),
    };
  });

  const { travelTime } = guide;
  const isRenderPointsList =
    !!guidesWithDistanceDelta?.length && !!subscription;

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

          <CText style={styles.aboutText}>About the guide</CText>
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
          {/*{!!subscription && (*/}
          {/*  <GuidePlayBtn guide={guide} style={styles.playBtn} />*/}
          {/*)}*/}
          {isRenderPointsList && (
            <>
              <CText style={{ ...styles.aboutText, ...styles.pointsTitle }}>
                Guide's points
              </CText>
              <GuidePointsList points={guidesWithDistanceDelta as any} />
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
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginBottom: 15,
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
