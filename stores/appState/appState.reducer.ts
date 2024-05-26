import { createSlice } from '@reduxjs/toolkit';
import Constants from 'expo-constants';
import { SCREENS } from '@/types';

export type AppStateType = {
  currentRoute: Record<SCREENS, any> | null;
  backScreen: Record<SCREENS, any> | null;
  envs: Record<string & 'STRIPE_PUBLIC_KEY', string>;
};

const INITIAL_STATE: AppStateType = {
  currentRoute: null,
  backScreen: null,
  envs: {
    STRIPE_PUBLIC_KEY: (Constants.expoConfig?.extra as any).STRIPE_PUBLIC_KEY,
  },
};

export const appStateSlice = createSlice({
  name: 'appStateStore',
  initialState: INITIAL_STATE,
  reducers: {
    dropState(state) {
      state = INITIAL_STATE;
    },
    setBackScreen(state, { payload }) {
      state.backScreen = payload;
    },
    updateCurrentRoute(state, { payload }) {
      state.currentRoute = payload;
    },
    updateEnvs(state, { payload }) {
      state.envs = payload;
    },
  },
});
