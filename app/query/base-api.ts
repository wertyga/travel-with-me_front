import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CITY_TAGS,
  GUIDE_TAGS,
  PLACE_TAGS,
  SUBSCRIPTION_TAGS,
  USER_TAGS,
} from '@/types';
import { baseQuery } from './base-query';

export const GUIDE_SIGNINOUT_TAGS = Object.values(GUIDE_TAGS);
export const USER_SIGNINOUT_TAGS = Object.values(USER_TAGS);
export const SUBSCRIPTION_SIGNINOUT_TAGS = Object.values(SUBSCRIPTION_TAGS);

export const SIGNINOUT_VALIDATION_TAGS = [
  ...GUIDE_SIGNINOUT_TAGS,
  ...USER_SIGNINOUT_TAGS,
  ...SUBSCRIPTION_SIGNINOUT_TAGS,
];

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    ...Object.values(USER_TAGS),
    ...Object.values(CITY_TAGS),
    ...Object.values(GUIDE_TAGS),
    ...Object.values(PLACE_TAGS),
    ...Object.values(SUBSCRIPTION_TAGS),
  ],
});
