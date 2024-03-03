import * as React from 'react';
import {
  dropGuideStoreStateAction,
  toggleGuideMute,
  updateFollowingGuideState,
  useSelector,
} from '@/stores';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import cn from '@/app/classname';
import { FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet } from 'react-native';
import { Guide } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  guide: Guide;
  isWithPreviewOpened?: boolean;
};

export const GuideActions = ({ guide, isWithPreviewOpened }: Props) => {
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
    <ScrollView
      style={cn(styles.container, { [isWithPreviewOpened]: { top: 30 } })}
      contentContainerStyle={styles.actions}
      horizontal
    >
      <Button
        style={cn(styles.actionBtn)}
        disabled={isLoadingLocation}
        onPress={toggleGuideMute}
      >
        <Ionicons name={volumeIcon} size={18} color="white" />
      </Button>
      <Button
        style={cn(styles.actionBtn, { [isFollowingToGuide]: styles.activeBtn })}
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
            {!!nearestPoint &&
              `${nearestPoint.point?.title}: ${nearestPoint.distance.toFixed(
                2
              )} km`}
          </CText>
        )}
      </Button>
    </ScrollView>
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
    width: 40,
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
