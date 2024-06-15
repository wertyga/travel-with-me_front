import { useEffect, useRef, useState } from 'react';
import { useFocus } from '@/hooks/useFocus';
import { useStores } from '@/hooks/useStores';

type Props = {
  withList?: boolean;
  withRetrySubscriptionFetching?: boolean;
};

export const useSubscription = (props?: Props) => {
  const timer = useRef(null as any);
  const [state, setState] = useState({
    isLoading: false,
  });
  const {
    user,
    createSubscription,
    isLoading,
    getSubscriptionsList,
    subscriptions,
    cancelSubscription,
    getMySubscription,
    renewMySubscription,
    mySubscription,
  } = useStores(stores => ({
    user: stores.userStore.user,
    createSubscription: stores.subscriptionStore.createSubscription,
    getSubscriptionsList: stores.subscriptionStore.getSubscriptionsList,
    cancelSubscription: stores.subscriptionStore.cancelSubscription,
    renewMySubscription: stores.subscriptionStore.renewMySubscription,
    getMySubscription: () => stores.subscriptionStore.getMySubscription({}),
    isLoading: stores.subscriptionStore.isLoading,
    subscriptions: stores.subscriptionStore.subscriptions,
    mySubscription: stores.subscriptionStore.mySubscription,
  }));

  useEffect(() => {
    if (!props?.withRetrySubscriptionFetching && timer.current) {
      clearInterval(timer.current);
      timer.current = null;

      return;
    } else if (!props?.withRetrySubscriptionFetching) {
      return;
    }

    timer.current = setInterval(async () => {
      if (state.isLoading) return;
      await getMySubscription();
    }, 2000);

    return () => {
      clearInterval(timer.current);
      timer.current = null;
    };
  }, [props?.withRetrySubscriptionFetching, state.isLoading]);

  useEffect(() => {
    if (!props?.withList) return;

    const fetchSubscriptions = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      await getSubscriptionsList();
      setState(prev => ({ ...prev, isLoading: false }));
    };

    fetchSubscriptions();
  }, [props?.withList]);

  useFocus(() => {
    if (!user) return;

    getMySubscription();
  }, [user]);

  return {
    user,
    subscription: mySubscription,
    subscriptions,
    cancelSubscription,
    createSubscription,
    renewMySubscription,
    isLoading: state.isLoading || isLoading,
  };
};
