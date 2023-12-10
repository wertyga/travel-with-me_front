import { baseApi } from '@/app/query';
import {
  CreateSubscriptionResponse,
  GetMySubscriptionRequest,
  GetMySubscriptionResponse,
  GetSubscriptionListResponse,
  SUBSCRIPTION_TAGS,
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
    getUserSubscription: build.query<
      GetMySubscriptionResponse,
      GetMySubscriptionRequest
    >({
      providesTags: [SUBSCRIPTION_TAGS.User],
      query: params => ({
        method: 'get',
        url: '/subscription/user',
        params,
      }),
    }),
  }),
});

export const {
  useGetSubscriptionListQuery,
  useLazyGetSubscriptionListQuery,
  useGetUserSubscriptionQuery,
  useLazyGetUserSubscriptionQuery,
  useCreateSubscriptionPaymentMutation,
} = subscriptionApi;
