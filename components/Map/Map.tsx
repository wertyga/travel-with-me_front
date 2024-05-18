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
import Button from '@/components/Button';
import { customMapStyles } from '@/components/Map/Map.utils';
import { MapMarker } from '@/components/Map/MapMarker';
import { MyLocationMarker } from '@/components/Map/MyLocationMarker';
import { useSelector } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { getMyLocation } from '@/utils';
import { Path, Place } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = MapViewProps & {
  points: Place[];
  chosenPoint?: Place;
  chosenRegion?: Path;
  onPress: (point: Place & { isChosen?: boolean }) => void;
  mapMarkerSize?: number;
  children?: React.ReactNode;
  mapStyles?: StyleProp<ViewStyle>;
};

export const Map = React.memo(
  ({
    points,
    onPress,
    mapMarkerSize,
    chosenPoint,
    chosenRegion,
    children,
    mapStyles,
    ...mapViewProps
  }: Props) => {
    const liveCoords = useSelector(
      ({ locationStore }) => locationStore?.liveCoords
    );
    const mapRef = useRef();
    const delta = useRef({
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
      latitude: 0,
      longitude: 0,
    });
    const [currentRegion, setCurrentRegion] = useState<Region>();

    const handlePointPress = useCallback(
      (point: Place) => () => {
        onPress(point);
      },
      []
    );

    const onRegionChange = useCallback(
      ({ latitudeDelta, longitudeDelta, latitude, longitude }) => {
        delta.current = { latitudeDelta, longitudeDelta, latitude, longitude };
      },
      []
    );

    const updateCurrentRegion = ({ longitude, latitude }) => {
      setCurrentRegion({
        latitudeDelta: delta.current.latitudeDelta,
        longitudeDelta: delta.current.longitudeDelta,
        longitude,
        latitude,
      });
    };

    const onGetMyLocationClick = async () => {
      const { longitude, latitude } = await getMyLocation();

      updateCurrentRegion({ longitude, latitude });
    };

    useEffect(() => {
      if (!chosenPoint) return;

      updateCurrentRegion({
        longitude: chosenPoint.coords.lng,
        latitude: chosenPoint.coords.lat,
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
            mapRef.current = marker;
          }}
          customMapStyle={customMapStyles}
          style={styles.map}
          zoomEnabled
          zoomTapEnabled
          enableZoomControl
          region={currentRegion}
          onRegionChange={onRegionChange}
          toolbarEnabled={false}
          initialRegion={{
            latitude: points[0].coords.lat,
            longitude: points[0].coords.lng,
            latitudeDelta: delta.current.latitudeDelta,
            longitudeDelta: delta.current.longitudeDelta,
          }}
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
        <Button
          style={styles.showMyLocationBtn}
          onPress={onGetMyLocationClick}
          noPaddings
        >
          <Ionicons name="man-sharp" size={18} color="white" />
        </Button>
        {children}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: Dimensions.get('window').height,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  showMyLocationBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: CONSTANTS.colors.bg1,
  },
});
