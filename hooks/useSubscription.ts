import {
  useCancelMySubscriptionMutation,
  useCreateSubscriptionPaymentMutation,
  useGetMySubscriptionQuery,
  useGetSubscriptionListQuery,
  useRenewMySubscriptionMutation,
} from '@/api';
import { useAuth } from '@/context';
import { useEffect, useRef } from 'react';

type Props = {
  withList?: boolean;
  withRetrySubscriptionFetching?: boolean;
};

export const useSubscription = (props?: Props) => {
  const timer = useRef(null as any);
  const { user } = useAuth();

  const [createSubscription, { isLoading: fetchLoading }] =
    useCreateSubscriptionPaymentMutation();

  const { data: { subscriptions = [] } = {}, isFetching: refetchLoading } =
    useGetSubscriptionListQuery(undefined, { skip: !props?.withList });

  const [cancelSubscription, { isLoading: cancelLoading }] =
    useCancelMySubscriptionMutation();

  const {
    data: { subscription } = {},
    isLoading: getMyLoading,
    isFetching: getMyLoadingRefetching,
    refetch: refetcnUserSubscription,
  } = useGetMySubscriptionQuery(undefined, {
    skip: !user,
  });

  const [
    renewMySubscription,
    {
      data: { subscription: renewedSubscription } = {},
      isLoading: renewLoading,
    },
  ] = useRenewMySubscriptionMutation();

  useEffect(() => {
    if (!props?.withRetrySubscriptionFetching && timer.current) {
      clearInterval(timer.current);
      timer.current = null;

      return;
    } else if (!props?.withRetrySubscriptionFetching) {
      return;
    }

    timer.current = setInterval(() => {
      if (getMyLoading || getMyLoadingRefetching) return;

      refetcnUserSubscription();
    }, 2000);

    return () => {
      clearInterval(timer.current);
      timer.current = null;
    };
  }, [
    props?.withRetrySubscriptionFetching,
    getMyLoadingRefetching,
    getMyLoading,
  ]);

  return {
    user,
    subscription,
    subscriptions,
    cancelSubscription,
    createSubscription,
    renewMySubscription,
    isLoading:
      fetchLoading ||
      refetchLoading ||
      cancelLoading ||
      getMyLoading ||
      renewLoading,
  };
};
