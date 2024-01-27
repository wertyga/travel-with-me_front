import { baseApi } from '@/app/query';
import { USER_TAGS, UserResponse } from '@/types';
import { UserFavoritesResponse } from '@/types/user';

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getSelf: build.query<UserResponse, void>({
      providesTags: [USER_TAGS.Self],
      query: () => ({
        method: 'get',
        url: '/users/self',
        silentError: true,
      }),
    }),
    getFavorites: build.query<UserFavoritesResponse, void>({
      providesTags: [USER_TAGS.Favorites],
      query: () => ({
        method: 'get',
        url: '/users/favorites',
      }),
    }),
  }),
});

export const { useGetSelfQuery, useGetFavoritesQuery } = userApi;
