import { ENV } from '@/stores/appState/appState.reducer';
import { calculateDistance, getNearestPoint } from '@/utils/map';
import { Path, Place } from '@/types';

export type NearestPoint = {
  point: Place;
  distance: number;
  isVisible?: boolean;
  becameVisible?: boolean;
};

const MIN_CLOSE_DISTANCE = 0;

let _nearestPoint: NearestPoint | undefined;

export const dropNearestPoint = () => {
  _nearestPoint = undefined;
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
  ) as number;

  const { minCloseDistance } = ENV;

  const isNewPointVisible = distanceToNearestPoint <= Number(minCloseDistance); // Prod
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
