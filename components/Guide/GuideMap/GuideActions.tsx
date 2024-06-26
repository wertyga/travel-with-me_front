import * as React from 'react';

import { StyleSheet, ViewStyle } from 'react-native';

import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { GuideMapGoToNearestPointBtn } from '@/components/Guide/GuideMap/GuideMapGoToNearestPointBtn';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';
import { useStores } from '@/hooks';

import { Guide, Place } from '@/types';

import { CONSTANTS } from '@/styles/constants';

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
  const {
    isFollowingToGuide,
    isGuideMuted,
    nearestPoint,
    dropFollowingGuide,
    toggleMuteGuideSound,
    liveCoords,
    setIsFollowingGuide,
  } = useStores(stores => ({
    isGuideMuted: stores.guideStore.isGuideMuted,
    nearestPoint: stores.guideStore.nearestPoint,
    isFollowingToGuide: stores.guideStore.isFollowingToGuide,
    dropFollowingGuide: stores.guideStore.dropFollowingGuide,
    toggleMuteGuideSound: stores.guideStore.toggleMuteGuideSound,
    setIsFollowingGuide: stores.guideStore.setIsFollowingGuide,
    liveCoords: stores.locationStore.liveCoords,
  }));

  const onToggleFollowGuide = () => {
    if (isFollowingToGuide) {
      dropFollowingGuide();
    } else {
      setIsFollowingGuide(true);
      toggleMuteGuideSound(false);
    }
  };

  const volumeIcon = isGuideMuted
    ? 'volume-medium-outline'
    : 'volume-mute-outline';
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
      {/*<Button*/}
      {/*  style={styles.actionBtn}*/}
      {/*  disabled={!liveCoords}*/}
      {/*  onPress={() => toggleMuteGuideSound()}*/}
      {/*  solid*/}
      {/*>*/}
      {/*  <CText>{isGuideMuted ? 'UNMUTE' : 'MUTE'}</CText>*/}
      {/*  <Ionicons name={volumeIcon} size={18} color="white" />*/}
      {/*</Button>*/}
      <GuideMapGoToNearestPointBtn
        guide={guide}
        onPointChoose={onPointChoose}
      />
      <Button
        style={[styles.actionBtn, !!nearestPoint && styles.activeBtn]}
        onPress={onToggleFollowGuide}
        solid
        squareSize={!nearestPoint && !!liveCoords && 40}
        disabled={isDisabledFollowGuide}
        free={!!nearestPoint}
      >
        <FontAwesome5 name="walking" size={18} color="white" />
        {!liveCoords && (
          <CText style={{ marginLeft: 10 }}>Loading location...</CText>
        )}
        {!!nearestPoint && (
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
