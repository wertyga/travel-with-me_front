import { LocationObject, PermissionStatus } from 'expo-location';

export type LocationStore = {
  location: {
    lat: number;
    lng: number;
  } | null;
  status: PermissionStatus;
};
