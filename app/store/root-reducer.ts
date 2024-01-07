import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '@/app/query';
import { locationSlice } from '@/stores';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [locationSlice.name]: locationSlice.reducer,
});
