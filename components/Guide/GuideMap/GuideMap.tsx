import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Map } from '@/components/Map';
import { Guide, Place } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { PointMapMarkerPreview } from '@/components/Point';
import CarouselEx from 'react-native-snap-carousel';
import cn from '@/app/classname';
import { StatusBar } from 'expo-status-bar';
import { updateDomAction, useSelector } from '@/stores';
import { GuideActions } from '@/components/Guide/GuideMap/GuideActions';
import { GuideMapPointActions } from '@/components/Guide/GuideMap/GuideMapPointActions';
import { PointImagesCarousel } from '@/components/Guide/GuideMap/PointImagesCarousel';

type Props = {
  guide: Guide;
};

const { width: windowWidth, height } = Dimensions.get('window');
const PREVIEW_HEIGHT = height / 3;

export const GuideMap = ({ guide }: Props) => {
  const carouselRef = useRef<CarouselEx<Guide> | null>(null);

  const windowHeight = useSelector(({ domStore }) => domStore?.layout?.height);
  const visiblePoint = useSelector(
    ({ guideStore }) => guideStore?.visiblePoint
  );
  const isGuideMuted = useSelector(
    ({ guideStore }) => guideStore?.isGuideMuted
  );
  const isFollowingToGuide = useSelector(
    ({ guideStore }) => guideStore?.isFollowingToGuide
  );

  const [state, setState] = useState({
    pointShowing: undefined as Place | undefined,
    isShowCarouselImages: false,
  });

  const onPointChoose = (point: Place, forceUpdate?: boolean) => {
    const pointIndex = guide.points.findIndex(p => p._id === point._id);
    carouselRef.current?.snapToItem(pointIndex, false);

    if (forceUpdate) {
      setState(prev => ({
        ...prev,
        pointShowing: { ...point },
      }));
    } else if (state.pointShowing?._id !== point._id) {
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
    const chosenPoint = guide.points.find((_, i) => i === index) || undefined;
    setState(prev => ({
      ...prev,
      pointShowing: chosenPoint,
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

  const mapHeight = !!state.pointShowing
    ? windowHeight - PREVIEW_HEIGHT
    : windowHeight - 110;

  return (
    <>
      {!!state.pointShowing && <StatusBar style="black" />}
      <Map
        points={guide.points}
        chosenPoint={state.pointShowing}
        onPress={onPointChoose}
        mapMarkerSize={30}
        mapStyles={cn(
          { ...styles.map, height: mapHeight },
          {
            [!!state.pointShowing]: styles.mapWithChosenPoint,
          }
        )}
      >
        <GuideActions
          guide={guide}
          isWithPreviewOpened={!!state.pointShowing}
        />
        {!!state.pointShowing && (
          <View style={styles.pointActions}>
            <GuideMapPointActions
              point={state.pointShowing}
              onOpenGallery={onToggleCarouselShow}
              navigateToPoint={() => onPointChoose(state.pointShowing!, true)}
            />
          </View>
        )}
      </Map>

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
                autoplayAudio={point.isChosen && !isGuideMuted}
              />
            );
          }}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
        />
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
    top: 110,
    left: 5,
    right: 5,
    zIndex: 10,
    borderRadius: 6,
    overflow: 'hidden',
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
    width: '100%',
    height: PREVIEW_HEIGHT,
    left: 0,
    backgroundColor: 'grey',
    bottom: '-100%',
    zIndex: 10,
  },
});
