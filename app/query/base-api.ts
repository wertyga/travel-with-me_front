import { createApi } from '@reduxjs/toolkit/query/react';
import { CITY_TAGS, GUIDE_TAGS, SUBSCRIPTION_TAGS, USER_TAGS } from '@/types';
import { baseQuery } from './base-query';

export const SUBSCRIPTION_VALIDATION_TAGS = [
  ...Object.values(GUIDE_TAGS),
  ...Object.values(USER_TAGS),
];

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    ...Object.values(USER_TAGS),
    ...Object.values(CITY_TAGS),
    ...Object.values(GUIDE_TAGS),
    ...Object.values(SUBSCRIPTION_TAGS),
  ],
});
