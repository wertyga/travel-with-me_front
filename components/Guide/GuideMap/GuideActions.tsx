import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';
import {
  dropGuideStoreStateAction,
  toggleGuideMute,
  updateFollowingGuideState,
  useSelector,
} from '@/stores';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  isWithPreviewOpened?: boolean;
};

export const GuideActions = ({ isWithPreviewOpened }: Props) => {
  const isGuideMuted = useSelector(
    ({ guideStore }) => guideStore?.isGuideMuted
  );
  const isLoadingLocation = useSelector(
    ({ locationStore }) => locationStore?.isLoading
  );
  const nearestPoint = useSelector(
    ({ guideStore }) => guideStore?.nearestPoint
  );
  const isFollowingToGuide = useSelector(
    ({ guideStore }) => guideStore?.isFollowingToGuide
  );

  const onToggleFollowGuide = () => {
    if (isFollowingToGuide) {
      dropGuideStoreStateAction();
    } else {
      updateFollowingGuideState(true);
    }
  };

  const volumeIcon = isGuideMuted
    ? 'volume-medium-outline'
    : 'volume-mute-outline';

  return (
    <ScrollHorizontalNoEdges
      style={[styles.container, isWithPreviewOpened && { top: 30 }]}
      contentContainerStyle={styles.actions}
      edge={CONSTANTS.spaces.paddingHorizontal}
    >
      <Button
        style={styles.actionBtn}
        disabled={isLoadingLocation}
        onPress={() => toggleGuideMute()}
      >
        <Ionicons name={volumeIcon} size={18} color="white" />
      </Button>
      <Button
        style={[styles.actionBtn, isFollowingToGuide && styles.activeBtn]}
        onPress={onToggleFollowGuide}
        disabled={isLoadingLocation}
      >
        {!isFollowingToGuide && (
          <FontAwesome5 name="walking" size={18} color="white" />
        )}
        {isFollowingToGuide && (
          <>
            <Octicons
              name="stop"
              size={22}
              color="white"
              style={{ marginRight: 10 }}
            />
          </>
        )}
        {!!nearestPoint && (
          <CText>
            {`Nearest point: ${nearestPoint.point?.title} ${nearestPoint.distance.toFixed(
              2
            )} km`}
          </CText>
        )}
      </Button>
    </ScrollHorizontalNoEdges>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 10,
    right: 10,
    top: 10,
    position: 'absolute',
    zIndex: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    minWidth: 40,
    backgroundColor: CONSTANTS.colors.bg1,
  },
  activeBtn: {
    backgroundColor: CONSTANTS.colors.bg1,
    borderColor: CONSTANTS.colors.bg1,
    width: undefined,
  },
  pointBtn: {
    marginLeft: 5,
    color: 'white',
  },
});
