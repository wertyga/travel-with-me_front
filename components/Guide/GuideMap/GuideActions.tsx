import * as React from 'react';

import { StyleSheet, ViewStyle } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';
import { useStores } from '@/hooks';

import { getNearestPoint } from '@/utils/map';

import { Guide, Place } from '@/types';

type Props = {
  guide: Guide;
  onPointChoose: (point: Place, force?: boolean) => void;
  style?: ViewStyle;
};

export const GuideActionsComponent = ({
  guide,
  onPointChoose,
  style,
}: Props) => {
  const { isFollowingToGuide, nearestPoint, liveCoords } = useStores(
    stores => ({
      nearestPoint: stores.guideStore.nearestPoint,
      isFollowingToGuide: stores.guideStore.isFollowingToGuide,
      liveCoords: stores.locationStore.liveCoords,
    })
  );

  const chooseNearestPoint = () => {
    if (!liveCoords) return;

    const nearestPoint = getNearestPoint(guide.points, liveCoords);
    if (!nearestPoint) return;

    onPointChoose(nearestPoint, true);
  };

  const nearestPointLabel =
    nearestPoint &&
    `${nearestPoint.point?.title} ${nearestPoint.distance.toFixed(2)} km`;

  const isDisabledFollowGuide =
    !liveCoords || (!!liveCoords && isFollowingToGuide && !nearestPoint);
  return (
    <ScrollHorizontalNoEdges
      style={[styles.container, style]}
      contentContainerStyle={styles.actions}
    >
      <Button
        style={[styles.actionBtn, !!nearestPoint && styles.activeBtn]}
        onPress={chooseNearestPoint}
        solid
        squareSize={!nearestPoint && !!liveCoords && 40}
        disabled={isDisabledFollowGuide}
        free={!!nearestPoint}
      >
        <FontAwesome5 name="walking" size={18} color="white" />
        {!liveCoords && (
          <CText style={{ marginLeft: 10 }}>Loading location...</CText>
        )}
        {!!nearestPoint && !!liveCoords && (
          <CText style={{ marginLeft: 10 }}>{nearestPointLabel}</CText>
        )}
      </Button>
    </ScrollHorizontalNoEdges>
  );
};

const styles = StyleSheet.create({
  container: {},
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 20,
  },
  actionBtn: {
    height: 40,
    gap: 10,
  },
  activeBtn: {},
  pointBtn: {
    marginLeft: 5,
    color: 'white',
  },
});

export const GuideActions = observer(GuideActionsComponent);
