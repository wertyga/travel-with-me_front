import { createApi } from '@reduxjs/toolkit/query/react';
import { CITY_TAGS, GUIDE_TAGS, USER_TAGS } from '@/types';
import { baseQuery } from './base-query';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    ...Object.values(USER_TAGS),
    ...Object.values(CITY_TAGS),
    ...Object.values(GUIDE_TAGS),
  ],
});
