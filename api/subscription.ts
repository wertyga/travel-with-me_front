import { baseApi } from '@/app/query';
import {
  CreateSubscriptionResponse,
  GetMySubscriptionRequest,
  GetMySubscriptionResponse,
  GetSubscriptionListResponse,
  SUBSCRIPTION_TAGS,
  SuccessResponse,
  UserSubscription,
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
    cancelUserSubscription: build.mutation<SuccessResponse, void>({
      invalidatesTags: [SUBSCRIPTION_TAGS.My],
      query: () => ({
        method: 'delete',
        url: '/subscription/',
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
  useCancelUserSubscriptionMutation,
} = subscriptionApi;
