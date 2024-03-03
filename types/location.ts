import { PermissionStatus } from 'expo-location';
import { Place } from '@/types/place';
import { Path } from '@/types/guide';

export type LocationStore = {
  status: PermissionStatus;
  distanceToNearestPoint?: number;
  isWatching?: boolean;
  isLoading?: boolean;
  liveCoords?: Path;
};
