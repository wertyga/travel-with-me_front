import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base-query';
import { CITY_TAGS, USER_TAGS } from '@/types';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [...Object.values(USER_TAGS), ...Object.values(CITY_TAGS)],
});
