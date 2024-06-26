import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { Dimensions, StyleSheet, View } from 'react-native';

import CarouselEx from 'react-native-snap-carousel';

import { StatusBar } from 'expo-status-bar';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { GestureUp } from '@/components/Gestures/GestureUp';
import { Map } from '@/components/Map';
import { DEFAULT_DELTA } from '@/components/Map/Map';
import { useForegroundPermissions, useStores } from '@/hooks';

import { FONTS, Guide, Place, SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import { GuideActions } from './GuideActions';
import { GuideMapGoToNearestPointBtn } from './GuideMapGoToNearestPointBtn';
import GuideMapPointPreview from './GuideMapPointPreview';
import { PointImagesCarousel } from './PointImagesCarousel';

type Props = {
  guide: Guide;
};

const MAX_PREVIEW_SWIPE_TOP = 50;
const PREVIEW_INITIAL_HEIGHT = 180;
const MAP_MARKER_SIZE = 40;

const GuideMap = ({ guide }: Props) => {
  const carouselRef = useRef<CarouselEx<Guide> | null>(null);

  const { granted, status } = useForegroundPermissions();

  const { visiblePoint, isFollowingToGuide, updateDomState } = useStores(
    stores => {
      return {
        visiblePoint: stores.guideStore.visiblePoint,
        isFollowingToGuide: stores.guideStore.isFollowingToGuide,
        updateDomState: stores.domStore.updateDomState,
      };
    }
  );

  const [state, setState] = useState({
    pointShowing: undefined,
    isShowCarouselImages: false,
    isAudioPlaying: false,
    isBgPermissionDenied: false,
  });

  const onPointChoose = (point: Place) => {
    const pointIndex = guide.points.findIndex(p => p._id === point._id);
    carouselRef.current?.snapToItem(pointIndex, false);

    if (state.pointShowing?._id !== point._id) {
      setState(prev => ({
        ...prev,
        pointShowing: point,
      }));
    }
  };

  const handleSlideToPoint = (point: Place) => {
    const pointIndex = guide.points.findIndex(({ _id }) => _id === point._id);
    carouselRef.current?.snapToItem(pointIndex, false, false);
  };

  const onToggleCarouselShow = () => {
    setState(prev => ({
      ...prev,
      isShowCarouselImages: !prev.isShowCarouselImages,
    }));
  };

  useEffect(() => {
    if (!visiblePoint || !isFollowingToGuide) return;

    const fulfilledPoint = guide.points.find(
      ({ _id }) => _id === visiblePoint?._id
    );
    setState(prev => ({
      ...prev,
      pointShowing: fulfilledPoint || visiblePoint,
      isShowCarouselImages: true,
    }));
    handleSlideToPoint(visiblePoint);
  }, [visiblePoint?._id, isFollowingToGuide, guide]);

  useEffect(() => {
    updateDomState({
      header: {
        display: state.pointShowing ? 'none' : 'flex',
      },
    });
  }, [state.pointShowing]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      pointShowing: guide.points[0],
    }));
  }, [guide]);

  const isLocationDenied = status === 'denied';

  return (
    <>
      <StatusBar style="dark" />

      <Map
        points={guide.points}
        chosenPoint={state.pointShowing}
        onPointPress={onPointChoose}
        initialRegion={{
          latitude: guide.points[0].coords.lat,
          longitude: guide.points[0].coords.lng,
          latitudeDelta: DEFAULT_DELTA,
          longitudeDelta: DEFAULT_DELTA,
        }}
        mapMarkerSize={MAP_MARKER_SIZE}
        mapStyles={styles.map}
        showMyLocationBtnStyle={styles.showMyLocationBtnStyle}
      >
        {isLocationDenied && (
          <Button style={styles.accessReminder} href={SCREENS.Profile}>
            You have disabled access to your location to follow the guide. You
            can grant the access back in your profile menu
          </Button>
        )}
        {granted && (
          <GuideActions
            guide={guide}
            onPointChoose={onPointChoose}
            style={styles.mapActions}
          />
        )}
      </Map>

      {!!state.pointShowing && (
        <GestureUp
          initialHeight={PREVIEW_INITIAL_HEIGHT}
          maxTop={MAX_PREVIEW_SWIPE_TOP}
        >
          {Trigger => {
            return (
              <GuideMapPointPreview
                point={state.pointShowing}
                Trigger={Trigger}
                guide={guide}
                onPointChange={onPointChoose}
              />
            );
          }}
        </GestureUp>
      )}

      {state.isShowCarouselImages && !!state.pointShowing && (
        <PointImagesCarousel
          point={state.pointShowing}
          onClose={onToggleCarouselShow}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  showMyLocationBtnStyle: {
    bottom: PREVIEW_INITIAL_HEIGHT + 50,
  },
  mapActions: {
    position: 'absolute',
    top: 100,
    paddingHorizontal: 10,
  },
  pointActions: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  mapWithChosenPoint: {
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 0,
  },
  soundBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    backgroundColor: CONSTANTS.colors.bg1,
    position: 'absolute',
    bottom: 9,
    left: 10,
  },
  accessReminder: {
    color: CONSTANTS.colors.bg1,
    fontFamily: FONTS.OpenSansBold,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    marginHorizontal: 5,
    fontSize: 13,
  },
});

export default observer(GuideMap);
