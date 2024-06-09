import { baseQuery } from '@/app/query';
import {
  CreateSubscriptionResponse,
  GetMySubscriptionRequest,
  GetMySubscriptionResponse,
  GetSubscriptionListResponse,
  SuccessResponse,
} from '@/types';

export const fetchSubscriptionList =
  async (): Promise<GetSubscriptionListResponse> => {
    const { data } = await baseQuery({
      method: 'get',
      url: '/subscription/list',
    });

    return data;
  };

export const createSubscriptionPayment = async (data: {
  subscription: string;
}): Promise<CreateSubscriptionResponse> => {
  const { data: response } = await baseQuery({
    method: 'post',
    url: '/subscription/create',
    data,
  });

  return response;
};

export const fetchMySubscription = async (
  params: GetMySubscriptionRequest
): Promise<GetMySubscriptionResponse> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/subscription/my',
    params,
  });

  return data;
};

export const cancelMySubscription = async (): Promise<SuccessResponse> => {
  const { data } = await baseQuery({
    method: 'delete',
    url: '/subscription/',
  });

  return data;
};

export const renewMySubscription = async (): Promise<SuccessResponse> => {
  const { data } = await baseQuery({
    method: 'put',
    url: '/subscription/renew',
  });

  return data;
};
