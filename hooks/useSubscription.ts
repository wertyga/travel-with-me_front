import {
  useCancelMySubscriptionMutation,
  useCreateSubscriptionPaymentMutation,
  useGetMySubscriptionQuery,
  useGetSubscriptionListQuery,
  useRenewMySubscriptionMutation,
} from '@/api';
import { useAuth } from '@/context';

type Props = {
  withList?: boolean;
};

export const useSubscription = (props?: Props) => {
  const { user } = useAuth();

  const [createSubscription, { isLoading: fetchLoading }] =
    useCreateSubscriptionPaymentMutation();

  const { data: { subscriptions = [] } = {}, isFetching: refetchLoading } =
    useGetSubscriptionListQuery(undefined, { skip: !props?.withList });

  const [cancelSubscription, { isLoading: cancelLoading }] =
    useCancelMySubscriptionMutation();

  const { data: { subscription } = {}, isFetching: getMyLoading } =
    useGetMySubscriptionQuery(undefined, {
      skip: !user,
    });

  const [
    renewMySubscription,
    {
      data: { subscription: renewedSubscription } = {},
      isLoading: renewLoading,
    },
  ] = useRenewMySubscriptionMutation();

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
