import { baseApi } from '@/app/query';
import {
  SIGNINOUT_VALIDATION_TAGS,
  USER_SIGNINOUT_TAGS,
} from '@/app/query/base-api';
import {
  CreateSubscriptionResponse,
  GetMySubscriptionRequest,
  GetMySubscriptionResponse,
  GetSubscriptionListResponse,
  SUBSCRIPTION_TAGS,
  SuccessResponse,
} from '@/types';

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getSubscriptionList: build.query<GetSubscriptionListResponse, void>({
      providesTags: [SUBSCRIPTION_TAGS.List],
      query: () => ({
        method: 'get',
        url: '/subscription/list',
      }),
    }),
    createSubscriptionPayment: build.mutation<
      { subscription: string },
      CreateSubscriptionResponse
    >({
      invalidatesTags: result => (!!result ? USER_SIGNINOUT_TAGS : []),
      query: data => ({
        method: 'post',
        url: '/subscription/create',
        data,
      }),
    }),
    getMySubscription: build.query<
      GetMySubscriptionResponse,
      GetMySubscriptionRequest
    >({
      providesTags: [SUBSCRIPTION_TAGS.My],
      query: params => ({
        method: 'get',
        url: '/subscription/my',
        params,
      }),
    }),
    cancelMySubscription: build.mutation<SuccessResponse, void>({
      invalidatesTags: result => (!!result ? SIGNINOUT_VALIDATION_TAGS : []),
      query: () => ({
        method: 'delete',
        url: '/subscription/',
      }),
    }),
    renewMySubscription: build.mutation<SuccessResponse, void>({
      invalidatesTags: result => (!!result ? SIGNINOUT_VALIDATION_TAGS : []),
      query: () => ({
        method: 'put',
        url: '/subscription/renew',
      }),
    }),
  }),
});

export const {
  useGetSubscriptionListQuery,
  useLazyGetSubscriptionListQuery,
  useGetMySubscriptionQuery,
  useLazyGetUserSubscriptionQuery,
  useCreateSubscriptionPaymentMutation,
  useCancelMySubscriptionMutation,
  useRenewMySubscriptionMutation,
} = subscriptionApi;
