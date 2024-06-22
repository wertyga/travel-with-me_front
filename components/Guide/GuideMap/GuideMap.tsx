import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { Dimensions, StyleSheet, View } from 'react-native';

import { Region } from 'react-native-maps';
import CarouselEx from 'react-native-snap-carousel';

import { StatusBar } from 'expo-status-bar';

import { observer } from 'mobx-react-lite';

import { BackgroundGradient } from '@/components/BackgroundGradient';
import Button from '@/components/Button';
import { GestureUp } from '@/components/Gestures/GestureUp';
import { Map } from '@/components/Map';
import { DEFAULT_DELTA } from '@/components/Map/Map';
import { PointMapMarkerPreview } from '@/components/Point/PointMapMarkerPreview/PointMapMarkerPreview';
import { useForegroundPermissions, useStores } from '@/hooks';

import { FONTS, Guide, Place, SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import { GuideActions } from './GuideActions';
import { GuideMapGoToNearestPointBtn } from './GuideMapGoToNearestPointBtn';
import { PointImagesCarousel } from './PointImagesCarousel';

type Props = {
  guide: Guide;
};

const { width: windowWidth } = Dimensions.get('window');
const MAX_PREVIEW_SWIPE_TOP = 50;
const PREVIEW_INITIAL_HEIGHT = 300;

const GuideMap = ({ guide }: Props) => {
  const carouselRef = useRef<CarouselEx<Guide> | null>(null);

  const { granted, status } = useForegroundPermissions();

  const {
    layoutHeight,
    visiblePoint,
    isGuideMuted,
    isFollowingToGuide,
    updateDomState,
  } = useStores(stores => {
    return {
      layoutHeight: stores.domStore.layoutHeight,
      visiblePoint: stores.guideStore.visiblePoint,
      isGuideMuted: stores.guideStore.isGuideMuted,
      isFollowingToGuide: stores.guideStore.isFollowingToGuide,
      updateDomState: stores.domStore.updateDomState,
    };
  });

  const [state, setState] = useState({
    pointShowing: undefined,
    isShowCarouselImages: false,
    isAudioPlaying: false,
    isBgPermissionDenied: false,
  });

  const onPointChoose = (point: Place & { isChosen?: boolean }) => {
    const pointIndex = guide.points.findIndex(p => p._id === point._id);
    carouselRef.current?.snapToItem(pointIndex, false);

    if (state.pointShowing?._id !== point._id) {
      setState(prev => ({
        ...prev,
        pointShowing: point,
      }));
    }
  };

  const onClose = () => {
    setState(prev => ({
      ...prev,
      pointShowing: undefined,
    }));
  };

  const onSlidePoint = (index: number) => {
    const pointShowing = guide.points.find((_, i) => i === index) || undefined;

    setState(prev => ({
      ...prev,
      pointShowing,
      isShowCarouselImages: false,
    }));
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

  const onPlaySound = (value: boolean) => {
    setState(prev => ({ ...prev, isAudioPlaying: value }));
  };

  useEffect(() => {
    if (!visiblePoint || !isFollowingToGuide) return;

    setState(prev => ({
      ...prev,
      pointShowing: visiblePoint,
      isShowCarouselImages: true,
    }));
    handleSlideToPoint(visiblePoint);
  }, [visiblePoint?._id, isFollowingToGuide]);

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
  }, []);

  const pointsWithChosen = guide.points.map(point => ({
    ...point,
    isChosen: point._id === visiblePoint?._id,
  }));

  const previewHeight = layoutHeight - (MAX_PREVIEW_SWIPE_TOP + 35);
  const mapHeightSmall = layoutHeight - (PREVIEW_INITIAL_HEIGHT + 35);
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
        mapMarkerSize={40}
        mapStyles={[
          styles.map,
          !!state.pointShowing && {
            height: mapHeightSmall,
            top: 0,
          },
        ]}
      >
        {isLocationDenied && (
          <Button style={styles.accessReminder} href={SCREENS.Profile}>
            You have disabled access to your location to follow the guide. You
            can grant the access back in your profile menu
          </Button>
        )}
        {granted && (
          <>
            <GuideActions />
            <GuideMapGoToNearestPointBtn
              guide={guide}
              onPointChoose={onPointChoose}
            />
          </>
        )}
      </Map>

      {!!state.pointShowing && (
        <GestureUp
          initialHeight={PREVIEW_INITIAL_HEIGHT}
          maxTop={MAX_PREVIEW_SWIPE_TOP}
        >
          {Trigger => {
            return (
              <BackgroundGradient style={styles.carouselWrapper}>
                <Trigger style={styles.swipeTrigger} />
                <CarouselEx
                  layout="tinder"
                  ref={c => {
                    // @ts-ignore
                    carouselRef.current = c;
                  }}
                  data={pointsWithChosen as any}
                  disableIntervalMomentum={true}
                  onSnapToItem={onSlidePoint}
                  // @ts-ignore
                  renderItem={({
                    item: point,
                  }: {
                    item: Place;
                    index: number;
                  }) => {
                    return (
                      <PointMapMarkerPreview
                        point={point}
                        onClose={onClose}
                        key={point._id}
                        autoplayAudio={point.isChosen && !isGuideMuted}
                        onToggleCarouselShow={onToggleCarouselShow}
                        onPlaySound={onPlaySound}
                        style={{
                          height: previewHeight,
                        }}
                      />
                    );
                  }}
                  sliderWidth={windowWidth}
                  itemWidth={windowWidth}
                />
              </BackgroundGradient>
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
    zIndex: 10,
    ...StyleSheet.absoluteFillObject,
    top: 120,
  },
  carouselWrapper: {
    width: Dimensions.get('window').width,
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
  swipeTrigger: {
    paddingBottom: 20,
  },
});

export default observer(GuideMap);
