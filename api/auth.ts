import { baseApi } from '@/app/query';
import {
  UserResponse,
  SignUpRequest,
  SignInRequest,
  SuccessResponse,
  RecoveryPasswordInitRequest,
  RecoveryPasswordRequest,
  ChangeEmailRequest,
  USER_TAGS,
} from '@/types';
import { SIGNINOUT_VALIDATION_TAGS } from '@/app/query/base-api';

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    recoveryPasswordInit: build.mutation<
      SuccessResponse,
      RecoveryPasswordInitRequest
    >({
      invalidatesTags: result => (result ? [USER_TAGS.Self] : []),
      query: data => ({
        method: 'post',
        url: '/auth/change-password-init',
        data,
      }),
    }),
    recoveryPassword: build.mutation<UserResponse, RecoveryPasswordRequest>({
      invalidatesTags: result =>
        result ? [USER_TAGS.List, USER_TAGS.Self] : [],
      query: data => ({
        method: 'post',
        url: '/auth/change-password',
        data,
      }),
    }),
    changeEmail: build.mutation<SuccessResponse, ChangeEmailRequest>({
      query: data => ({
        method: 'post',
        url: '/auth/change-email',
        data,
      }),
    }),
    signIn: build.mutation<UserResponse, SignInRequest>({
      invalidatesTags: result => (result ? SIGNINOUT_VALIDATION_TAGS : []),
      query: data => ({
        method: 'post',
        url: '/auth/signin',
        data,
      }),
    }),
    signUp: build.mutation<UserResponse, SignUpRequest>({
      query: data => ({
        method: 'post',
        url: '/auth/signup',
        data,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useRecoveryPasswordInitMutation,
  useRecoveryPasswordMutation,
  useChangeEmailMutation,
} = authApi;
