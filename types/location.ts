import { PermissionStatus } from 'expo-location';
import { Path } from '@/types/guide';
import { Place } from '@/types/place';

export type LocationStore = {
  status: PermissionStatus;
  distanceToNearestPoint?: number;
  isWatching?: boolean;
  isLoading?: boolean;
  liveCoords?: Path;
};
