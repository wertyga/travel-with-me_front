import { baseApi } from '@/app/query';
import {
  OauthGoogleRequest,
  UserResponse,
  OauthFacebookRequest,
  SignUpRequest,
  SignInRequest,
  ConfirmEmailRequest,
  SuccessResponse,
  RecoveryPasswordInitRequest,
  RecoveryPasswordRequest,
  ChangeEmailRequest,
  USER_TAGS,
} from '@/types';

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
        result ? [USER_TAGS.List, USER_TAGS.User] : [],
      query: data => ({
        method: 'post',
        url: '/auth/change-password',
        data,
      }),
    }),
    confirmEmail: build.mutation<UserResponse, ConfirmEmailRequest>({
      query: data => ({
        method: 'post',
        url: '/auth/confirm-email',
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
    oauthGoogle: build.mutation<UserResponse, OauthGoogleRequest>({
      query: data => ({
        method: 'post',
        url: '/oauth/google',
        data,
      }),
    }),
    oauthFacebook: build.mutation<UserResponse, OauthFacebookRequest>({
      query: data => ({
        method: 'post',
        url: '/oauth/facebook',
        data,
      }),
    }),
    // updateSelfUser: build.mutation<UserUpdateResponse, UserUpdateRequest>({
    //   query: data => ({
    //     method: 'put',
    //     url: '/users/update',
    //     data,
    //   }),
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     const {
    //       data: { user },
    //     } = await queryFulfilled;
    //     dispatch(userSlice.actions.update(user));
    //   },
    // }),
  }),
});

export const {
  useSignUpMutation,
  useRecoveryPasswordInitMutation,
  useOauthFacebookMutation,
  useOauthGoogleMutation,
  useSignInMutation,
  useConfirmEmailMutation,
  useRecoveryPasswordMutation,
  useUpdateSelfUserMutation,
  useChangeEmailMutation,
} = authApi;
