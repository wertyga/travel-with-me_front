import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '@/app/query';
import { locationSlice } from '@/stores/location/location.reducer';
import { guideSlice } from '@/stores/guide/guide.reducer';
import { domSlice } from '@/stores/dom/dom.reducer';
import { appStateSlice } from '@/stores/appState/appState.reducer';
import { notifySlice } from '@/stores/notify/notify.reducer';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [locationSlice.name]: locationSlice.reducer,
  [guideSlice.name]: guideSlice.reducer,
  [domSlice.name]: domSlice.reducer,
  [appStateSlice.name]: appStateSlice.reducer,
  [notifySlice.name]: notifySlice.reducer,
});
