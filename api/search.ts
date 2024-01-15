import { baseApi } from '@/app/query';
import { GetGlobalSearchRequest, GetGlobalSearchResponse } from '@/types';

export const searchApi = baseApi.injectEndpoints({
  endpoints: build => ({
    globalSearch: build.query<GetGlobalSearchResponse, GetGlobalSearchRequest>({
      providesTags: [],
      query: params => {
        return {
          method: 'get',
          url: '/search',
          params,
        };
      },
    }),
  }),
});

export const { useLazyGlobalSearchQuery } = searchApi;
