import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';

import MapView, {
  MapViewProps,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { MaterialIcons } from '@expo/vector-icons';

import { getMyLocation } from '@/mobx/stores/location/location.utils';
import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { customMapStyles } from '@/components/Map/Map.utils';
import { MapMarker } from '@/components/Map/MapMarker';
import { MyLocationMarker } from '@/components/Map/MyLocationMarker';
import { useStores } from '@/hooks';

import { Place } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = MapViewProps & {
  points: Place[];
  initialRegion?: Region;
  onRegionChange?: (region: Region) => void;
  chosenPoint?: Place;
  onPointPress: (point: Place & { isChosen?: boolean }) => void;
  mapMarkerSize?: number;
  children?: React.ReactNode;
  mapStyles?: ViewStyle;
  showMyLocationBtnStyle?: ViewStyle;
};

export const DEFAULT_DELTA = 0.2;
const MY_LOCATION_DELTA = 0.01;

export const MapComponent = ({
  points,
  onPointPress,
  mapMarkerSize,
  chosenPoint,
  children,
  onRegionChange,
  mapStyles,
  initialRegion,
  showMyLocationBtnStyle,
  ...mapViewProps
}: Props) => {
  const mapRef = useRef();
  const regionRef = useRef<Region>({} as Region);

  const { liveCoords } = useStores(stores => ({
    liveCoords: stores.locationStore.liveCoords,
  }));

  const [currentRegion, setCurrentRegion] = useState<Region | undefined>();

  const handlePointPress = useCallback(
    (point: Place) => () => {
      onPointPress(point);
    },
    []
  );

  const onGetMyLocationClick = async () => {
    const { longitude, latitude } = await getMyLocation();

    setCurrentRegion({
      latitudeDelta: MY_LOCATION_DELTA,
      longitudeDelta: MY_LOCATION_DELTA,
      longitude,
      latitude,
    });
  };

  const handleRegionChange = data => {
    regionRef.current = data;
  };

  useEffect(() => {
    if (!chosenPoint) return;

    setCurrentRegion({
      longitude: chosenPoint.coords.lng,
      latitude: chosenPoint.coords.lat,
      latitudeDelta: regionRef.current?.latitudeDelta || DEFAULT_DELTA,
      longitudeDelta: regionRef.current?.latitudeDelta || DEFAULT_DELTA,
    });
  }, [chosenPoint]);

  const { formattedPoints } = useMemo(() => {
    return {
      formattedPoints: points.map(point => ({
        ...point,
        isChosen: point._id === chosenPoint?._id,
      })),
    };
  }, [points, chosenPoint]);

  return (
    <View style={[styles.container, mapStyles]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={marker => {
          // @ts-ignore
          mapRef.current = marker;
        }}
        customMapStyle={customMapStyles}
        style={styles.map}
        zoomEnabled
        zoomTapEnabled
        region={currentRegion}
        onRegionChange={handleRegionChange}
        toolbarEnabled={false}
        initialRegion={initialRegion}
        {...mapViewProps}
      >
        {!!liveCoords && <MyLocationMarker liveCoords={liveCoords} />}

        {formattedPoints.map((point, index) => {
          const { coords, title, description, images, isChosen } = point;
          return (
            <MapMarker
              key={title}
              onPress={handlePointPress(point)}
              markerSize={mapMarkerSize}
              isChosenExists={!!chosenPoint}
              {...{ coords, title, description, image: images[0], isChosen }}
            />
          );
        })}
      </MapView>
      {!!liveCoords && (
        <Button
          style={[styles.showMyLocationBtn, showMyLocationBtnStyle]}
          onPress={onGetMyLocationClick}
          noPaddings
          squareSize={40}
          rounded
        >
          <MaterialIcons name="location-searching" size={20} color="white" />
        </Button>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  showMyLocationBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: CONSTANTS.colors.bg1,
  },
});

export const Map = observer(MapComponent);
