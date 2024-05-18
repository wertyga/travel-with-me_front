import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LocationSubscription, PermissionStatus } from 'expo-location';
import { startWatchToLiveLocation } from '@/utils';
import { Guide, LocationStore } from '@/types';

export let watchLocationHandler: LocationSubscription | undefined = undefined;

const INITIAL_STATE: LocationStore = {
  distanceToNearestPoint: undefined,
  liveCoords: undefined,
  isWatching: false,
  isLoading: false,
  status: PermissionStatus.UNDETERMINED,
};

export const onStartWatchingLocation = createAsyncThunk(
  'locationStore/onStartWatchingLocation',
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
  extraReducers: builder => {
    builder.addCase(onStartWatchingLocation.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(onStartWatchingLocation.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(onStartWatchingLocation.rejected, state => {
      state.isLoading = false;
    });
  },
});
