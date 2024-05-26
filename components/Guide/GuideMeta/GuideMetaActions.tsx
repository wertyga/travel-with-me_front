import { StyleSheet } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { CountryPill } from '@/components/Country';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';
import { useNavigation, useSubscription } from '@/hooks';
import { Guide, SCREENS } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  travelTime?: string;
  guide: Guide;
};

export const GuideMetaActions = ({ travelTime, guide }: Props) => {
  const navi = useNavigation();
  const { subscription } = useSubscription();

  return (
    <ScrollHorizontalNoEdges
      contentContainerStyle={styles.container}
      style={styles.scrollView}
      edge={CONSTANTS.spaces.paddingHorizontal}
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
    </ScrollHorizontalNoEdges>
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
