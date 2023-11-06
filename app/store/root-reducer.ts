import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '@/app/query';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});
