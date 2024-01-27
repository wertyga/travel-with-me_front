import { Dimensions, StyleSheet, View } from 'react-native';
import { CountryPill } from '@/components/Country';
import { CText } from '@/components/CText';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { FONTS, Guide, SCREENS, SOCIAL_MODELS } from '@/types';
import { useSubscription } from '@/hooks';
import Button from '@/components/Button';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { GuidePointsList } from '../GuidePointsList/GuidePointsList';
import { LikeAction } from '@/components/LikeAction';

type Props = {
  guide: Guide;
  isFetching: boolean;
};

const { height } = Dimensions.get('window');
const META_HEIGHT = height - 120;

export const GuideMeta = ({ guide, isFetching }: Props) => {
  const navi = useNavigation();
  const { subscription, user } = useSubscription();

  const { travelTime } = guide;
  const isRenderPointsList = !!guide.points?.length && !!subscription;

  return (
    <EntityMeta
      wrapperHeight={META_HEIGHT}
      collapsedHeight={320}
      TopContent={
        <>
          <View style={styles.top}>
            <View style={styles.topLeft}>
              {!!travelTime && <CountryPill title={travelTime} icon="clock" />}
              <CountryPill
                title={`${guide.pointsCount} points`}
                icon="map-point-small"
              />
            </View>
            <LikeAction
              modelType={SOCIAL_MODELS.Guide}
              _id={guide._id}
              initialLike={guide.likes}
              parentFetching={isFetching}
            />
          </View>

          <View style={styles.title}>
            <CText style={styles.aboutText}>About the guide</CText>
            {!!subscription && (
              <View style={styles.actions}>
                <CountryPill
                  title="Follow"
                  onPress={() =>
                    navi.navigate(
                      SCREENS.GuideMap as any,
                      {
                        guideSlug: guide.slug,
                      } as any
                    )
                  }
                  customIcon={
                    <Ionicons
                      name="play-circle-outline"
                      size={22}
                      color="white"
                    />
                  }
                />
                <CountryPill
                  title="Open map"
                  onPress={() =>
                    navi.navigate(
                      SCREENS.GuideMap as any,
                      { guideSlug: guide.slug, isOnlyMap: true } as any
                    )
                  }
                  customIcon={
                    <SimpleLineIcons name="map" size={22} color="white" />
                  }
                />
              </View>
            )}
          </View>
        </>
      }
      BottomContent={
        <>
          {!subscription && (
            <Button
              high
              href={user ? SCREENS.Subscriptions : SCREENS.Login}
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
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 10,
  },
  topLeft: {
    flexDirection: 'row',
    gap: 10,
  },
  playBtn: {
    marginTop: 10,
  },
});
