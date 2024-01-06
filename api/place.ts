import { baseApi } from '@/app/query';
import { GetPlaceResponse, PLACE_TAGS } from '@/types';

export const placeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPlace: build.query<GetPlaceResponse, { slug: string }>({
      providesTags: result =>
        result ? [{ type: PLACE_TAGS.Place, id: result.place._id }] : [],
      query: params => {
        return {
          method: 'get',
          url: '/place',
          params,
        };
      },
    }),
  }),
});

export const { useGetPlaceQuery } = placeApi;
