import { baseApi } from '@/app/query';
import { UserResponse } from '@/types';

export const oauthApi = baseApi.injectEndpoints({
  endpoints: build => ({
    oauthGoogle: build.mutation<UserResponse, { accessToken: string }>({
      query: data => ({
        method: 'post',
        url: '/oauth/google',
        data,
      }),
    }),
    oauthFacebook: build.mutation<UserResponse, { accessToken: string }>({
      query: data => ({
        method: 'post',
        url: '/oauth/facebook',
        data,
      }),
    }),
  }),
});

export const { useOauthGoogleMutation, useOauthFacebookMutation } = oauthApi;
