import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Path, Place } from '@/types';
import { logger } from '@/utils/logger';

const LOCATION_TASK_NAME = 'background-location-task';

export const getLocationPermission = async () => {
  let { status } = await Location.getForegroundPermissionsAsync();

  if (status === 'undetermined') {
    const data = await Location.requestForegroundPermissionsAsync();
    status = data.status;
  }

  return status;
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
        } = data;
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
  // Get fg permission
  let status = await getLocationPermission();
  if (status !== 'granted') {
    const data = await Location.requestForegroundPermissionsAsync();
    status = data.status;
  }
  console.log({ status });

  if (status !== 'granted') return;

  // Get bg permission
  let bgStatus = await getBackgroundLocationPermission();
  console.log({ bgStatus });
  if (bgStatus !== 'granted') {
    await Location.requestBackgroundPermissionsAsync();
  }

  await Location.watchPositionAsync(
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
