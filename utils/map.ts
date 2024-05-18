import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { Path, Place } from '@/types';

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const calculateDistance = (
  point1?: Path,
  point2?: Path,
  onlyNumber?: boolean
) => {
  if (!point1 || !point2) return undefined;

  const kmDistance: number = getDistanceFromLatLonInKm(
    point1.lat,
    point1.lng,
    point2.lat,
    point2.lng
  );
  const roundedDistance = kmDistance.toFixed(kmDistance > 100 ? 0 : 2);
  if (onlyNumber) {
    return kmDistance as number;
  }

  return `${roundedDistance} km`;
};

export const getNearestPoint = (pointsList: Place[], coords2: Path): Place => {
  if (!pointsList.length) return;

  let closestDistance;
  return pointsList.reduce((acc, point) => {
    const distance = calculateDistance(coords2, point.coords, true);

    if (!closestDistance || distance < closestDistance) {
      closestDistance = distance;
      return point;
    }

    return acc;
  }, pointsList[0]);
};
