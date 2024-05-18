import { baseApi } from '@/app/query';
import { appStateSlice } from '@/stores/appState/appState.reducer';
import { domSlice } from '@/stores/dom/dom.reducer';
import { guideSlice } from '@/stores/guide/guide.reducer';
import { locationSlice } from '@/stores/location/location.reducer';
import { notifySlice } from '@/stores/notify/notify.reducer';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [locationSlice.name]: locationSlice.reducer,
  [guideSlice.name]: guideSlice.reducer,
  [domSlice.name]: domSlice.reducer,
  [appStateSlice.name]: appStateSlice.reducer,
  [notifySlice.name]: notifySlice.reducer,
});
