import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Path } from '@/types';

const LOCATION_TASK_NAME = 'background-location-task';

export const getLocationPermission = async () => {
  let data = await Location.getForegroundPermissionsAsync();

  if (data.status === 'undetermined') {
    data = await Location.requestForegroundPermissionsAsync();
  }

  return data;
};

export const getBackgroundLocationPermission = async () => {
  let { status } = await Location.getBackgroundPermissionsAsync();

  if (status === 'undetermined') {
    const data = await Location.requestBackgroundPermissionsAsync();
    status = data.status;
  }

  return status;
};

export const startWatchToLiveLocationInBackground = async (
  callback: (path: Path) => void
) => {
  const status = await getBackgroundLocationPermission();

  if (status !== 'granted') return false;

  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    try {
      if (error) {
        return;
      }
      if (data) {
        const {
          locations: [{ coords }],
        } = data as any;
        callback({ lat: coords.latitude, lng: coords.longitude });
      }
    } catch (e) {}
  });

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.BestForNavigation,
  });

  return true;
};

export const stopWatchingBackgroundLocation = async () => {
  await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
};

export const startWatchToLiveLocation = async (
  callback: (coords: Path) => void,
  minDistance?: number
) => {
  return Location.watchPositionAsync(
    {
      accuracy: Location.LocationAccuracy.BestForNavigation,
      distanceInterval: minDistance,
      timeInterval: 1000,
    },
    newLocation => {
      let { coords } = newLocation;

      callback({ lat: coords.latitude, lng: coords.longitude });
    }
  );
};

export const getMyLocation = async () => {
  const location = await Location.getCurrentPositionAsync();

  return location.coords;
};
