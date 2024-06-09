import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CarouselEx from 'react-native-snap-carousel';
import { StatusBar } from 'expo-status-bar';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { Map } from '@/components/Map';
import { PointMapMarkerPreview } from '@/components/Point/PointMapMarkerPreview/PointMapMarkerPreview';
import { useNavigation } from '@/hooks';
import { useStores } from '@/hooks';
import { observer } from 'mobx-react';
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

export const GuideMapComponent = ({
  guide,
  onPressGoToPointDirections,
}: Props) => {
  const route = useRoute();
  const navi = useNavigation();

  const {
    layoutHeight,
    visiblePoint,
    isGuideMuted,
    isFollowingToGuide,
    updateDomState,
  } = useStores(stores => ({
    layoutHeight: stores.domStore.layoutHeight,
    visiblePoint: stores.guideStore.visiblePoint,
    isGuideMuted: stores.guideStore.isGuideMuted,
    isFollowingToGuide: stores.guideStore.isFollowingToGuide,
    updateDomState: stores.domStore.updateDomState,
  }));

  const [state, setState] = useState({
    // @ts-ignore
    pointShowing: (route.params?.pointShowing || undefined) as
      | Place
      | undefined,
    // @ts-ignore
    pointShowingIndex: route.params?.pointShowingIndex || 0,
    isShowCarouselImages: false,
    isAudioPlaying: false,
    isBgPermissionDenied: false,
  });

  const carouselRef = useRef<CarouselEx<Guide> | null>(null);

  const updateRouteMapState = (params: any) => {
    navi.setParams(params);
  };

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
  }, [visiblePoint?._id, isFollowingToGuide]);

  useEffect(() => {
    updateRouteMapState({
      pointShowing: state.pointShowing,
      pointShowingIndex: state.pointShowingIndex,
    });

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

  const PREVIEW_HEIGHT = layoutHeight / 2;
  const mapHeight = !!state.pointShowing
    ? layoutHeight - PREVIEW_HEIGHT
    : layoutHeight - MAP_TOP - 5;

  return (
    <>
      {!!state.pointShowing && <StatusBar style="dark" />}
      <Map
        points={guide.points}
        chosenPoint={state.pointShowing}
        // @ts-ignore
        onPress={onPointChoose}
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

export const GuideMap = observer(GuideMapComponent);
