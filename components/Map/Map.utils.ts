import { Path, Place } from '@/types';
import { Alert, Linking } from 'react-native';

export const getMiddleCoordinates = (
  points: { lat: number; lng: number }[]
) => {
  let minLat = 0;
  let minLng = 0;
  let maxLat = 0;
  let maxLng = 0;

  points.forEach(({ lng, lat }) => {
    maxLng = Math.max(lng, maxLng);
    minLng = Math.min(lng, maxLng);
    maxLat = Math.max(lat, maxLat);
    minLat = Math.min(lat, minLat);
  });

  const middleLat = maxLat - minLat;
  const middleLng = maxLng - minLng;
  let middlePoint = points[0];

  points.forEach(point => {
    const { lng, lat } = point;
    const middlePointLatDifference = Math.abs(middlePoint.lat - lat);
    const middlePointLngDifference = Math.abs(middlePoint.lng - lng);
    const lngDifference = Math.abs(middleLng - lng);
    const latDifference = Math.abs(middleLat - lat);

    if (
      lngDifference < middlePointLngDifference &&
      latDifference < middlePointLatDifference
    ) {
      middlePoint = point;
    }
  });

  return middlePoint;
};

export const openGoogleMap = (coords: Path) => {
  Linking.openURL(`https://maps.google.com/?q=${coords.lat},${coords.lng}`);
};

export const openMaps = () => {
  Alert.alert(
    'Open in Maps',
    'Choose the app to open this location',
    [
      {
        text: 'Google Maps',
        onPress: () =>
          Linking.openURL(
            `https://maps.google.com/?q=${coords.lat},${coords.lng}`
          ),
      },
      {
        text: 'Apple Maps',
        onPress: () =>
          Linking.openURL(
            `http://maps.apple.com/?sll=${coords.lat},${coords.lng}&daddr=${coords.lat},${coords.lng}`
          ),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    { cancelable: true }
  );
};
