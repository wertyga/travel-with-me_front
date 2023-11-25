import { baseApi } from '@/app/query';
import { USER_TAGS, UserResponse } from '@/types';

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    providesTags: [USER_TAGS.Self],
    getSelf: build.query<UserResponse, void>({
      query: () => ({
        method: 'get',
        url: '/users/self',
      }),
    }),
  }),
});

export const { useGetSelfQuery } = userApi;
