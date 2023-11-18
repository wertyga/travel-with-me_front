import { baseApi } from '@/app/query';
import { GetCitiesListRequest, GetCitiesListResponse } from '@/types';

export const cityApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getCities: build.query<GetCitiesListResponse, GetCitiesListRequest>({
      provideTags: [],
      query: params => {
        return {
          method: 'get',
          url: '/city',
          params,
        };
      },
    }),
  }),
});

export const { useGetCitiesQuery, useLazyGetCitiesQuery } = cityApi;
