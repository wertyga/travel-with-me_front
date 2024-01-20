import MapView, { Region } from 'react-native-maps';
import { Place } from '@/types';
import { MapMarker } from '@/components/Map/MapMarker';
import { StyleSheet } from 'react-native';
import { getMiddleCoordinates } from '@/components/Map/Map.utils';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { LatLng } from 'react-native-maps/lib/sharedTypes';

type Props = {
  points: Place[];
  chosenPoint?: Place;
  onPress: (point: Place & { isChosen?: boolean }) => void;
  mapMarkerSize?: number;
};

export const Map = React.memo(
  ({ points, onPress, mapMarkerSize, chosenPoint }: Props) => {
    const delta = useRef({ latitudeDelta: 0.2, longitudeDelta: 0.2 });

    const handlePointPress = useCallback(
      (point: Place) => () => {
        onPress(point);
      },
      []
    );

    const onRegionChange = useCallback(({ latitudeDelta, longitudeDelta }) => {
      delta.current = { latitudeDelta, longitudeDelta };
    }, []);

    const region = useMemo(() => {
      return chosenPoint
        ? {
            latitude: chosenPoint.coords.lat,
            longitude: chosenPoint.coords.lng,
          }
        : undefined;
    }, [chosenPoint]);

    const { middlePoint, formattedPoints } = useMemo(() => {
      return {
        middlePoint: getMiddleCoordinates(points.map(({ coords }) => coords)),
        formattedPoints: points.map(point => ({
          ...point,
          isChosen: point._id === chosenPoint?._id,
        })),
      };
    }, [points, chosenPoint]);

    const { latitudeDelta, longitudeDelta } = delta.current;
    const currentRegion = useMemo(() => {
      return region ? { latitudeDelta, longitudeDelta, ...region } : undefined;
    }, [region]);

    return (
      <MapView
        style={styles.container}
        zoomEnabled
        zoomTapEnabled
        region={currentRegion}
        onRegionChange={onRegionChange}
        showsUserLocation
        showsMyLocationButton
        enableZoomControl
        initialRegion={{
          latitude: middlePoint.lat,
          longitude: middlePoint.lng,
          latitudeDelta,
          longitudeDelta,
        }}
      >
        {formattedPoints.map((point, index) => {
          const { coords, title, description, images, isChosen } = point;
          return (
            <MapMarker
              key={index}
              onPress={handlePointPress(point)}
              markerSize={mapMarkerSize}
              isChosenExists={!!chosenPoint}
              {...{ coords, title, description, images, isChosen }}
            />
          );
        })}
      </MapView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
