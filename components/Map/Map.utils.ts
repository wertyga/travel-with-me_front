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

export const customMapStyles = [
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        saturation: '-100',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text',
    stylers: [
      {
        color: '#545454',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        saturation: '-87',
      },
      {
        lightness: '-40',
      },
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f0f0f0',
      },
      {
        saturation: '-22',
      },
      {
        lightness: '-16',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        saturation: '-52',
      },
      {
        hue: '#00e4ff',
      },
      {
        lightness: '-16',
      },
    ],
  },
];
