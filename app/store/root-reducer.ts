import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '@/app/query';
import { locationSlice } from '@/stores/location/location.reducer';
import { guideSlice } from '@/stores/guide/guide.reducer';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [locationSlice.name]: locationSlice.reducer,
  [guideSlice.name]: guideSlice.reducer,
});
