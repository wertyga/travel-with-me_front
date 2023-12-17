import { Dimensions, StyleSheet, View } from 'react-native';
import { Map } from '@/components/Map';
import { Guide, Place } from '@/types';
import { useRef, useState } from 'react';
import { PointPreview } from '@/components/Point';
import CarouselEx from 'react-native-snap-carousel';
import * as React from 'react';

type Props = {
  guide: Guide;
};

export const GuideMap = ({ guide }: Props) => {
  const carouselRef = useRef(null);
  const [state, setState] = useState<{
    chosenPoint: Place | null;
    isSliding: boolean;
  }>({
    chosenPoint: null,
    isSliding: false,
  });

  const onPointChoose = (chosenPoint: Place) => {
    const pointIndex = guide.points.findIndex(p => p._id === chosenPoint._id);
    carouselRef.current.snapToItem(pointIndex, false);

    setState(prev => ({ ...prev, chosenPoint, isSliding: false }));
  };

  const onClose = () => {
    setState(prev => ({ ...prev, chosenPoint: null, isSliding: false }));
  };

  const onSlidePoint = (index: number) => {
    const chosenPoint = guide.points.find((_, i) => i === index) || null;
    setState(prev => ({ ...prev, chosenPoint, isSliding: true }));
  };

  const { width } = Dimensions.get('screen');
  const points = guide.points.map(point => ({
    ...point,
    isChosen: point._id === state.chosenPoint?._id,
  }));
  const mapRegion = state.chosenPoint
    ? {
        latitude: state.chosenPoint.coords.lat,
        longitude: state.chosenPoint.coords.lng,
      }
    : undefined;
  return (
    <View>
      <Map points={points} onPress={onPointChoose} region={mapRegion} />

      <View
        style={[
          styles.pointPreview,
          { bottom: state.chosenPoint ? 0 : '-100%' },
        ]}
      >
        <CarouselEx
          layout="tinder"
          ref={c => {
            carouselRef.current = c;
          }}
          data={guide.points as any}
          disableIntervalMomentum={true}
          onSnapToItem={onSlidePoint}
          renderItem={({ item: point }: { item: Place }) => {
            return (
              <PointPreview point={point} onClose={onClose} key={point._id} />
            );
          }}
          sliderWidth={width}
          itemWidth={width}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pointPreview: {
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('screen').height / 2.5,
    bottom: 0,
    left: 0,
    backgroundColor: 'grey',
  },
});
