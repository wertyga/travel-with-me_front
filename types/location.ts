import { PermissionStatus } from 'expo-location';
import { Place } from '@/types/place';
import { Path } from '@/types/guide';

export type LocationStore = {
  status: PermissionStatus;
  distanceToNearestPoint?: number;
  nearestPoint?: Place;
  chosenPoint?: Place;
  isWatching?: boolean;
  isLoading?: boolean;
  liveCoords?: Path;
  pointChooseType?: 'manually' | 'auto';
};
