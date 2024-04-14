import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Map } from '@/components/Map';
import { Guide, Place } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { PointMapMarkerPreview } from '@/components/Point/PointMapMarkerPreview/PointMapMarkerPreview';
import CarouselEx from 'react-native-snap-carousel';
import cn from '@/app/classname';
import { StatusBar } from 'expo-status-bar';
import { toggleGuideMute, updateDomAction, useSelector } from '@/stores';
import { CarouselDots } from '@/components/Carousel';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { GuideActions } from './GuideActions';
import { PointImagesCarousel } from './PointImagesCarousel';
import { GuideMapGoToNearestPointBtn } from './GuideMapGoToNearestPointBtn';
import { useNavigation } from '@/hooks';
import { useRoute } from '@react-navigation/native';
import { useNotify } from '@/context';
import Button from '@/components/Button';
import { Foundation } from '@expo/vector-icons';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  guide: Guide;
  onPressGoToPointDirections?: (point: Place) => void;
};

const { width: windowWidth } = Dimensions.get('window');
const MAP_TOP = 120;

export const GuideMap = ({ guide, onPressGoToPointDirections }: Props) => {
  const route = useRoute();
  const navi = useNavigation();

  const carouselRef = useRef<CarouselEx<Guide> | null>(null);

  const layoutHeight = useSelector(({ domStore }) => domStore?.layout?.height);

  const visiblePoint = useSelector(
    ({ guideStore }) => guideStore?.visiblePoint
  );
  const isGuideMuted = useSelector(
    ({ guideStore }) => guideStore?.isGuideMuted
  );
  const isFollowingToGuide = useSelector(
    ({ guideStore }) => guideStore?.isFollowingToGuide
  );

  const updateRouteMapState = (params: any) => {
    navi.setParams(params);
  };

  const [state, setState] = useState({
    pointShowing: (route.params?.pointShowing || undefined) as
      | Place
      | undefined,
    pointShowingIndex: route.params?.pointShowingIndex || 0,
    isShowCarouselImages: false,
    isAudioPlaying: false,
  });

  const onPointChoose = (point: Place, forceUpdate?: boolean) => {
    const pointIndex = guide.points.findIndex(p => p._id === point._id);
    carouselRef.current?.snapToItem(pointIndex, false);

    if (forceUpdate) {
      setState(prev => ({
        ...prev,
        pointShowing: { ...point },
        pointShowingIndex: pointIndex,
      }));
    } else if (state.pointShowing?._id !== point._id) {
      setState(prev => ({
        ...prev,
        pointShowing: point,
        pointShowingIndex: pointIndex,
      }));
    }
  };

  const onClose = () => {
    setState(prev => ({
      ...prev,
      pointShowing: undefined,
      pointShowingIndex: 0,
    }));
  };

  const onSlidePoint = (index: number) => {
    const chosenPoint = guide.points.find((_, i) => i === index) || undefined;
    setState(prev => ({
      ...prev,
      pointShowing: chosenPoint,
      pointShowingIndex: index,
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
  }, [visiblePoint, isFollowingToGuide]);

  useEffect(() => {
    updateRouteMapState({
      pointShowing: state.pointShowing,
      pointShowingIndex: state.pointShowingIndex,
    });

    updateDomAction({
      header: {
        display: state.pointShowing ? 'none' : 'flex',
      },
    });
  }, [state.pointShowing]);

  const pointsWithChosen = guide.points.map(point => ({
    ...point,
    isChosen: point._id === visiblePoint?._id,
  }));

  const PREVIEW_HEIGHT = layoutHeight / 2;
  const mapHeight = !!state.pointShowing
    ? layoutHeight - PREVIEW_HEIGHT
    : layoutHeight - MAP_TOP - 5;

  return (
    <>
      {!!state.pointShowing && <StatusBar style="black" />}
      <Map
        points={guide.points}
        chosenPoint={state.pointShowing}
        onPress={onPointChoose}
        mapMarkerSize={30}
        mapStyles={[
          { ...styles.map, height: mapHeight },
          !!state.pointShowing && styles.mapWithChosenPoint,
        ]}
      >
        <GuideActions isWithPreviewOpened={!!state.pointShowing} />

        {/*{state.isAudioPlaying && (*/}
        {/*  <Button style={styles.soundBtn} onPress={toggleGuideMute}>*/}
        {/*    <Foundation name="sound" size={24} color="white" />*/}
        {/*  </Button>*/}
        {/*)}*/}

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
          <CarouselDots
            totalCount={pointsWithChosen.length}
            currentIndex={state.pointShowingIndex}
          />

          <CarouselEx
            layout="tinder"
            ref={c => {
              carouselRef.current = c;
            }}
            data={pointsWithChosen as any}
            disableIntervalMomentum={true}
            onSnapToItem={onSlidePoint}
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
    // overflow: 'hidden',
  },
  carouselWrapper: {
    width: Dimensions.get('window').width,
    paddingTop: 10,
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
