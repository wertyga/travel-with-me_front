import { ScrollView, StyleSheet } from 'react-native';
import { CountryPill } from '@/components/Country';
import { useNavigation, useSubscription } from '@/hooks';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Guide, SCREENS } from '@/types';

type Props = {
  travelTime?: string;
  guide: Guide;
};

export const GuideMetaActions = ({ travelTime, guide }: Props) => {
  const navi = useNavigation();
  const { subscription } = useSubscription();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {!!travelTime && <CountryPill title={travelTime} icon="clock" />}
      <CountryPill
        title={`${guide.pointsCount} points`}
        icon="map-point-small"
      />
      {!!subscription && (
        <>
          <CountryPill
            title="Follow"
            onPress={() =>
              navi.navigate(SCREENS.GuideMap, {
                guide,
              })
            }
            customIcon={
              <Ionicons name="play-circle-outline" size={20} color="white" />
            }
          />
          <CountryPill
            title="Open map"
            onPress={() =>
              navi.navigate(SCREENS.GuideMap, {
                guide,
                isOnlyMap: true,
              })
            }
            customIcon={<SimpleLineIcons name="map" size={18} color="white" />}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: 30,
    maxHeight: 30,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
