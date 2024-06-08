import Constants from 'expo-constants';
import { createSlice } from '@reduxjs/toolkit';
import { SCREENS } from '@/types';

const envNames = ['stripePk', 'minCloseDistance'];

export let ENV: Record<(typeof envNames)[number], string> = {
  stripePk: (Constants.expoConfig?.extra as any).STRIPE_PUBLIC_KEY,
};

export type AppStateType = {
  currentRoute: Record<SCREENS, any> | null;
  backScreen: Record<SCREENS, any> | null;
};

const INITIAL_STATE: AppStateType = {
  currentRoute: null,
  backScreen: null,
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
      ENV = payload;
    },
  },
});
