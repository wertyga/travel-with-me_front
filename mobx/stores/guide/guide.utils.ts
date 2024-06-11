import { AppStateStore } from '@/mobx/stores/AppStateStore';
import { calculateDistance, getNearestPoint } from '@/utils/map';
import { Path, Place } from '@/types';

export type NearestPoint = {
  point: Place;
  distance: number;
  isVisible?: boolean;
  becameVisible?: boolean;
};

export const getTheNearestVisiblePoint = (
  points: Place[],
  liveCoords: Path,
  prevNearestPoint = null
): NearestPoint => {
  const newNearestPoint = getNearestPoint(points, liveCoords);
  const distanceToNearestPoint = calculateDistance(
    newNearestPoint?.coords,
    liveCoords,
    true
  ) as number;

  const { minCloseDistance } = AppStateStore.ENV;

  // const isNewPointVisible = distanceToNearestPoint <= Number(minCloseDistance); // Prod
  const isNewPointVisible = distanceToNearestPoint >= Number(minCloseDistance); // Test
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
