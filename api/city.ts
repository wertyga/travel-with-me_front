import { baseApi } from '@/app/query';
import {
  City,
  CITY_TAGS,
  GetCitiesListRequest,
  GetCitiesListResponse,
} from '@/types';

export const cityApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getCities: build.query<GetCitiesListResponse, GetCitiesListRequest>({
      providesTags: [],
      query: params => {
        return {
          method: 'get',
          url: '/city/list',
          params,
        };
      },
    }),
    getCitiesLightList: build.query<GetCitiesListResponse, void>({
      providesTags: [CITY_TAGS.LightList],
      query: () => {
        return {
          method: 'get',
          url: '/city/light-list',
        };
      },
    }),
    getCity: build.query<{ city: City }, { slug: string }>({
      providesTags: result =>
        result ? [{ type: CITY_TAGS.City, id: result.city._id }] : [],
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

export const {
  useGetCitiesQuery,
  useLazyGetCitiesQuery,
  useGetCityQuery,
  useLazyGetCityQuery,
  useLazyGetCitiesLightListQuery,
  useGetCitiesLightListQuery,
} = cityApi;
