import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Map } from '@/components/Map';
import { Guide, Place } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { PointMapMarkerPreview } from '@/components/Point';
import CarouselEx from 'react-native-snap-carousel';
import cn from '@/app/classname';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from '@/stores';
import { GuideActions } from '@/components/Guide/GuideMap/GuideActions';
import { PointImagesCarousel } from '@/components/Guide/GuideMap/PointImagesCarousel';

type Props = {
  guide: Guide;
};

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
const PREVIEW_HEIGHT = 350;
const EXPANDED_TOP_MAP = 25;

export const GuideMap = ({ guide }: Props) => {
  const carouselRef = useRef<CarouselEx<Guide> | null>(null);
  const visiblePoint = useSelector(
    ({ guideStore }) => guideStore?.visiblePoint
  );
  const isGuideMuted = useSelector(
    ({ guideStore }) => guideStore?.isGuideMuted
  );
  const isWatchingLocation = useSelector(
    ({ locationStore }) => locationStore?.isWatching
  );

  const [state, setState] = useState({
    pointShowing: undefined as Place | undefined,
    pointChosenType: 'manual',
    isShowCarouselImages: true,
  });

  const onPointChoose = (point: Place) => {
    const pointIndex = guide.points.findIndex(p => p._id === point._id);
    carouselRef.current?.snapToItem(pointIndex, false);

    if (state.pointShowing?._id !== point._id) {
      setState(prev => ({
        ...prev,
        pointShowing: point,
        pointChosenType: 'manual',
      }));
    }
  };

  const onClose = () => {
    setState(prev => ({
      ...prev,
      pointShowing: undefined,
      pointChosenType: 'manual',
    }));
  };

  const onSlidePoint = (index: number) => {
    const chosenPoint = guide.points.find((_, i) => i === index) || undefined;
    setState(prev => ({
      ...prev,
      pointShowing: chosenPoint,
      pointChosenType: 'manual',
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

  useEffect(() => {
    if (!visiblePoint || !isWatchingLocation) return;

    setState(prev => ({
      ...prev,
      pointShowing: visiblePoint,
      isShowCarouselImages: true,
      pointChosenType: 'auto',
    }));
    handleSlideToPoint(visiblePoint);
  }, [visiblePoint, isWatchingLocation]);

  const pointsWithChosen = guide.points.map(point => ({
    ...point,
    isChosen: point._id === state.pointShowing?._id,
  }));

  const isShowGallery =
    !!state.pointShowing &&
    !!state.pointShowing.images.length &&
    state.isShowCarouselImages;
  const mapHeight = !!state.pointShowing
    ? windowHeight - PREVIEW_HEIGHT
    : windowHeight - 110;

  return (
    <>
      {!!state.pointShowing && <StatusBar style="black" />}

      <View
        style={cn(
          { ...styles.map, height: mapHeight },
          {
            [!!state.pointShowing]: styles.mapWithChosenPoint,
          }
        )}
      >
        <Map
          points={guide.points}
          chosenPoint={state.pointShowing}
          onPress={onPointChoose}
          mapMarkerSize={30}
          mapPadding={{ top: mapHeight - 60, right: 0, bottom: 0, left: 0 }}
        />
        <GuideActions
          guide={guide}
          isWithPreviewOpened={!!state.pointShowing}
        />
      </View>

      <View
        style={cn(styles.pointPreview, {
          [!!state.pointShowing]: { bottom: 0 },
        })}
      >
        <CarouselEx
          layout="tinder"
          ref={c => {
            carouselRef.current = c;
          }}
          data={pointsWithChosen as any}
          disableIntervalMomentum={true}
          onSnapToItem={onSlidePoint}
          renderItem={({ item: point }: { item: Place }) => {
            return (
              <PointMapMarkerPreview
                point={point}
                onClose={onClose}
                key={point._id}
                autoplayAudio={
                  point.isChosen &&
                  !isGuideMuted &&
                  state.pointChosenType === 'auto'
                }
                onOpenGallery={onToggleCarouselShow}
              />
            );
          }}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
        />
      </View>

      {isShowGallery && (
        <PointImagesCarousel
          point={state.pointShowing!}
          onClose={onToggleCarouselShow}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 110,
    left: 5,
    right: 5,
    zIndex: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  mapWithChosenPoint: {
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 0,
  },
  pointPreview: {
    position: 'absolute',
    width: '100%',
    height: PREVIEW_HEIGHT,
    left: 0,
    backgroundColor: 'grey',
    bottom: '-100%',
    zIndex: 10,
  },
});
