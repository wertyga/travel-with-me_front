import { StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import { CountryPill } from '@/components/Country';
import { useNavigation, useSubscription } from '@/hooks';

import { Guide, SCREENS } from '@/types';

type Props = {
  travelTime?: string;
  guide: Guide;
};

export const GuideMetaActionsComponent = ({ travelTime, guide }: Props) => {
  const navi = useNavigation();
  const { subscription } = useSubscription();

  return (
    <View style={[styles.scrollView, styles.container]}>
      {!!travelTime && <CountryPill title={travelTime} icon="clock" />}
      <CountryPill
        title={`${guide.pointsCount} points`}
        icon="map-point-small"
      />
      {!!subscription && (
        <>
          <CountryPill
            title="Explore"
            onPress={() =>
              navi.navigate(SCREENS.GuideMap, {
                guide,
              })
            }
            customIcon={
              <Ionicons name="play-circle-outline" size={20} color="white" />
            }
          />
        </>
      )}
    </View>
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

export const GuideMetaActions = observer(GuideMetaActionsComponent);
