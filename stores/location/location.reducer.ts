import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Guide, LocationStore } from '@/types';
import { LocationSubscription, PermissionStatus } from 'expo-location';
import { startWatchToLiveLocation } from '@/utils/map';

export let watchLocationHandler: LocationSubscription | undefined = undefined;

const INITIAL_STATE: LocationStore = {
  distanceToNearestPoint: undefined,
  nearestPoint: undefined,
  chosenPoint: undefined,
  liveCoords: undefined,
  pointChooseType: undefined,
  isWatching: false,
  status: PermissionStatus.UNDETERMINED,
};

export const onStartWatchingLocation = createAsyncThunk(
  'locationStore/onStartWatchingAction',
  async (guide: Guide, { dispatch }) => {
    if (watchLocationHandler) return;

    watchLocationHandler = await startWatchToLiveLocation(liveCoords => {
      dispatch({
        type: 'guideStore/updateGuidePointWithLiveCoords',
        payload: {
          guide,
          liveCoords,
        },
      });

      dispatch({
        type: 'locationStore/updateState',
        payload: {
          isWatching: true,
          liveCoords,
        },
      });
    });
  }
);

export const locationSlice = createSlice({
  name: 'locationStore',
  initialState: INITIAL_STATE,
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    onStopWatchLocation(state) {
      watchLocationHandler?.remove();
      watchLocationHandler = undefined;

      return { ...state, ...INITIAL_STATE };
    },
  },
});
