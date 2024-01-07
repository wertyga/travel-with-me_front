import { createSlice } from '@reduxjs/toolkit';
import { LocationStore } from '@/types';
import { PermissionStatus } from 'expo-location';

const INITIAL_STATE: LocationStore = {
  location: null,
  status: PermissionStatus.UNDETERMINED,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState: INITIAL_STATE,
  reducers: {
    setLocation(state, { payload }) {
      state.location = payload.location;
    },
  },
});

export const { setLocation } = locationSlice.actions;
