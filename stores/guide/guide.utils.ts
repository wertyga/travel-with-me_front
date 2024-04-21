import { Path, Place } from '@/types';
import { calculateDistance, getNearestPoint } from '@/utils/map';

export const MIN_CLOSE_DISTANCE = 0.01; // In km

export type NearestPoint = {
  point: Place;
  distance: number;
  isVisible?: boolean;
  becameVisible?: boolean;
};

let _nearestPoint: NearestPoint;

export const dropNearestPoint = () => {
  _nearestPoint = undefined as NearestPoint;
};

export const getTheNearestVisiblePoint = (
  points: Place[],
  liveCoords: Path,
  prevNearestPoint = _nearestPoint
): NearestPoint => {
  const newNearestPoint = getNearestPoint(points, liveCoords);
  const distanceToNearestPoint = calculateDistance(
    newNearestPoint?.coords,
    liveCoords,
    true
  );

  const isNewPointVisible = distanceToNearestPoint <= MIN_CLOSE_DISTANCE; // Prod
  // const isNewPointVisible = distanceToNearestPoint >= MIN_CLOSE_DISTANCE; // Test
  const isNewPointStartBeVisible =
    isNewPointVisible && !prevNearestPoint?.isVisible;
  const isNewPointStartBeHidden =
    !isNewPointVisible && !!prevNearestPoint?.isVisible;

  prevNearestPoint = {
    point: newNearestPoint,
    distance: distanceToNearestPoint as number,
    isVisible: isNewPointVisible,
  };

  prevNearestPoint.distance = distanceToNearestPoint as number;
  prevNearestPoint.becameVisible = undefined;

  if (isNewPointStartBeVisible) {
    prevNearestPoint = {
      ...prevNearestPoint,
      point: newNearestPoint,
      isVisible: true,
      becameVisible: true,
    } as NearestPoint;
  }

  if (isNewPointStartBeHidden) {
    prevNearestPoint = {
      ...prevNearestPoint,
      point: newNearestPoint,
      isVisible: false,
      becameVisible: false,
    } as NearestPoint;
  }

  return prevNearestPoint;
};
