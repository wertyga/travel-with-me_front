import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { setLocation } from '@/stores';
import { useEffect } from 'react';

let foregroundSubscription: { remove: () => void } | null = null;

export const LocationComponent = () => {
  const dispatch = useDispatch();

  const initiateLiveLocation = () => {};

  const getUserLocation = async () => {
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (!foreground.granted) {
      console.log('Permission to access location was denied');
    }
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log('Location tracking denied!');
      return;
    }
    // Best practice to remove the subscription before fetching it to stop already running location fetching
    foregroundSubscription?.remove();

    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      async location => {
        dispatch(
          setLocation({
            location: {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            },
          })
        );
      }
    );
  };

  useEffect(() => {
    // getUserLocation();
  }, []);

  return null;
};
