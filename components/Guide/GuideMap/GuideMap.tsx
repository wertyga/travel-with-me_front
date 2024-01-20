import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Map } from '@/components/Map';
import { Guide, Place } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { PointMapMarkerPreview } from '@/components/Point';
import CarouselEx from 'react-native-snap-carousel';
import cn from '@/app/classname';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { useSelector, updateChosenPointAction } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';

type Props = {
  guide: Guide;
};

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
const PREVIEW_HEIGHT = 350;

export const GuideMap = ({ guide }: Props) => {
  const carouselRef = useRef<CarouselEx<Guide> | null>(null);
  const chosenPoint = useSelector(({ guideStore }) => guideStore?.chosenPoint);
  const choosePointType = useSelector(
    ({ guideStore }) => guideStore?.choosePointType
  );

  const onPointChoose = (chosenPoint: Place) => {
    const pointIndex = guide.points.findIndex(p => p._id === chosenPoint._id);
    carouselRef.current?.snapToItem(pointIndex, false);

    updateChosenPointAction(chosenPoint);
  };

  const onClose = () => {
    updateChosenPointAction();
  };

  const onSlidePoint = (index: number) => {
    const chosenPoint = guide.points.find((_, i) => i === index) || undefined;
    updateChosenPointAction(chosenPoint);
  };

  const handleSlideToPoint = (point: Place) => {
    const pointIndex = guide.points.findIndex(({ _id }) => _id === point._id);
    carouselRef.current?.snapToItem(pointIndex, false, false);
  };

  useEffect(() => {
    if (!chosenPoint) return;

    handleSlideToPoint(chosenPoint);
  }, [chosenPoint]);

  const pointsWithChosen = guide.points.map(point => ({
    ...point,
    isChosen: point._id === chosenPoint?._id,
  }));

  return (
    <>
      {!!chosenPoint && <StatusBar style="black" />}
      <View style={styles.actions}>
        <Button style={styles.actionBtn} filled>
          <Ionicons name="volume-medium-outline" size={24} color="black" />
        </Button>
        <Button style={styles.actionBtn} filled>
          <Ionicons name="walk" size={24} color="black" />
        </Button>
      </View>

      <View
        style={cn(styles.map, {
          [!!chosenPoint]: styles.mapWithChosenPoint,
        })}
      >
        <Map
          points={guide.points}
          chosenPoint={chosenPoint}
          onPress={onPointChoose}
          mapMarkerSize={30}
        />
      </View>

      <View
        style={cn(styles.pointPreview, {
          [!!chosenPoint]: { bottom: 0 },
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
                autoplayAudio={point.isChosen && choosePointType === 'auto'}
              />
            );
          }}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: windowHeight - 180,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    zIndex: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  mapWithChosenPoint: {
    top: 0,
    height: windowHeight - PREVIEW_HEIGHT,
    left: 0,
    right: 0,
    borderRadius: 0,
  },
  actions: {
    top: 120,
    flexDirection: 'row',
    gap: 10,
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
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
