import { baseApi } from '@/app/query';
import { USER_TAGS, UserResponse } from '@/types';

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
  }),
});

export const { useGetSelfQuery } = userApi;
