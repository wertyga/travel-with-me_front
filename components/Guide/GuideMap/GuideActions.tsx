import * as React from 'react';
import {
  dropGuideStoreStateAction,
  onStartWatchingAction,
  onStopWatchLocation,
  toggleGuideMute,
  useSelector,
} from '@/stores';
import Button from '@/components/Button';
import cn from '@/app/classname';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Icon } from '@/components/Icon';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { FONTS, Guide } from '@/types';
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
  const isWatchingLocation = useSelector(
    ({ locationStore }) => locationStore?.isWatching
  );

  const onToggleFollowGuide = () => {
    if (isWatchingLocation) {
      onStopWatchLocation();
      dropGuideStoreStateAction();
    } else {
      onStartWatchingAction(guide);
    }
  };

  const volumeIcon = isGuideMuted
    ? 'volume-mute-outline'
    : 'volume-medium-outline';

  return (
    <ScrollView
      style={cn({ ...styles.container, top: isWithPreviewOpened ? 45 : 10 })}
      contentContainerStyle={styles.actions}
      horizontal
    >
      <Button
        style={cn(styles.actionBtn, { [!isGuideMuted]: styles.activeBtn })}
        filled={isGuideMuted}
        disabled={isLoadingLocation}
        onPress={toggleGuideMute}
      >
        <Ionicons
          name={volumeIcon}
          size={18}
          color={isGuideMuted ? 'black' : 'white'}
        />
        <Text
          style={{
            marginLeft: 5,
            marginBottom: 1,
            color: isGuideMuted ? 'black' : 'white',
          }}
        >
          {isGuideMuted ? 'Enable sound' : 'Mute'}
        </Text>
      </Button>
      <Button
        style={cn(styles.actionBtn, { [isWatchingLocation]: styles.activeBtn })}
        filled={!isWatchingLocation}
        onPress={onToggleFollowGuide}
        disabled={isLoadingLocation}
      >
        {isWatchingLocation && (
          <FontAwesome5 name="walking" size={18} color="white" />
        )}
        {!isWatchingLocation && (
          <Icon
            name="no-access"
            size={24}
            color="black"
            style={{ marginTop: 5 }}
          />
        )}
        <Text
          style={{
            marginLeft: 5,
            marginBottom: 1,
            color: !isWatchingLocation ? 'black' : 'white',
          }}
        >
          {isWatchingLocation ? 'Stop' : 'Follow'}
          {!!nearestPoint &&
            `: ${nearestPoint.point?.title}: ${nearestPoint.distance.toFixed(
              2
            )} km`}
        </Text>
      </Button>
      {/*{!!nearestPoint && (*/}
      {/*  <Button style={styles.activeBtn}>*/}
      {/*    <Icon name="map-point-small" />*/}
      {/*    <Text style={styles.pointBtn}>*/}
      {/*      {`${nearestPoint.point?.title}: ${nearestPoint.distance.toFixed(*/}
      {/*        2*/}
      {/*      )} km`}*/}
      {/*    </Text>*/}
      {/*  </Button>*/}
      {/*)}*/}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 10,
    right: 10,
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
    height: 30,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
  },
  activeBtn: {
    backgroundColor: CONSTANTS.colors.bg1,
    borderColor: CONSTANTS.colors.bg1,
  },
  pointBtn: {
    marginLeft: 5,
    color: 'white',
  },
});
