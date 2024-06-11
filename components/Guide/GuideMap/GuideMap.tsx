import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Region } from 'react-native-maps';
import CarouselEx from 'react-native-snap-carousel';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { Map } from '@/components/Map';
import { DEFAULT_DELTA } from '@/components/Map/Map';
import { PointMapMarkerPreview } from '@/components/Point/PointMapMarkerPreview/PointMapMarkerPreview';
import { useStores } from '@/hooks';
import { Guide, Place } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import { GuideActions } from './GuideActions';
import { GuideMapGoToNearestPointBtn } from './GuideMapGoToNearestPointBtn';
import { PointImagesCarousel } from './PointImagesCarousel';

type Props = {
  guide: Guide;
  onPressGoToPointDirections?: (point: Place) => void;
};

const { width: windowWidth } = Dimensions.get('window');
const MAP_TOP = 120;

const GuideMap = ({ guide, onPressGoToPointDirections }: Props) => {
  const carouselRef = useRef<CarouselEx<Guide> | null>(null);

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

  const onRegionChange = (region: Region) => {};

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

  const pointsWithChosen = guide.points.map(point => ({
    ...point,
    isChosen: point._id === visiblePoint?._id,
  }));

  const PREVIEW_HEIGHT = layoutHeight / 2.5;
  const mapHeight = !!state.pointShowing
    ? layoutHeight - PREVIEW_HEIGHT
    : layoutHeight - MAP_TOP - 5;

  return (
    <>
      {!!state.pointShowing && <StatusBar style="dark" />}
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
        onRegionChange={onRegionChange}
        mapMarkerSize={30}
        mapStyles={[
          { ...styles.map, height: mapHeight },
          !!state.pointShowing && styles.mapWithChosenPoint,
        ]}
      >
        <GuideActions isWithPreviewOpened={!!state.pointShowing} />

        <GuideMapGoToNearestPointBtn
          guide={guide}
          onPointChoose={onPointChoose}
        />
      </Map>

      <View
        style={[
          styles.pointPreview,
          { height: PREVIEW_HEIGHT },
          !!state.pointShowing && {
            top: layoutHeight - PREVIEW_HEIGHT,
          },
        ]}
      >
        <BackgroundGradient style={styles.carouselWrapper}>
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
            renderItem={({ item: point }: { item: Place; index: number }) => {
              return (
                <PointMapMarkerPreview
                  point={point}
                  onClose={onClose}
                  key={point._id}
                  autoplayAudio={point.isChosen && !isGuideMuted}
                  onToggleCarouselShow={onToggleCarouselShow}
                  onPlaySound={onPlaySound}
                  onPressGoToPointDirections={onPressGoToPointDirections}
                />
              );
            }}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
          />
        </BackgroundGradient>
      </View>

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
    top: MAP_TOP,
    left: 5,
    right: 5,
    zIndex: 10,
    borderRadius: 6,
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
  pointPreview: {
    position: 'absolute',
    left: 0,
    top: Dimensions.get('screen').height,
    backgroundColor: 'grey',
    zIndex: 10,
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
});

export default observer(GuideMap);
