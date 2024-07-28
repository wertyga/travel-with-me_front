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
    mySubHasBeenFetched,
    setMySubHasBeenFetched,
  } = useStores(stores => ({
    user: stores.userStore.user,
    createSubscription: stores.subscriptionStore.createSubscription,
    getSubscriptionsList: stores.subscriptionStore.getSubscriptionsList,
    cancelSubscription: stores.subscriptionStore.cancelSubscription,
    renewMySubscription: stores.subscriptionStore.renewMySubscription,
    getMySubscription: () =>
      stores.subscriptionStore.getMySubscription({ isActive: true }),
    isLoading: stores.subscriptionStore.isLoading,
    subscriptions: stores.subscriptionStore.subscriptions,
    mySubscription: stores.subscriptionStore.mySubscription,
    mySubHasBeenFetched: stores.subscriptionStore.mySubHasBeenFetched,
    setMySubHasBeenFetched: stores.subscriptionStore.setMySubHasBeenFetched,
  }));

  const loading = state.isLoading || isLoading;

  useFocus(() => {
    if (!props?.withRetrySubscriptionFetching && timer.current) {
      clearInterval(timer.current);
      timer.current = null;

      return;
    } else if (!props?.withRetrySubscriptionFetching) {
      return;
    }

    timer.current = setInterval(async () => {
      if (loading) return;
      await getMySubscription();
    }, 2000);

    return () => {
      clearInterval(timer.current);
      timer.current = null;
    };
  }, [props?.withRetrySubscriptionFetching]);

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
    if (!user || loading) return;

    const isExpired =
      !!mySubscription &&
      new Date(mySubscription.validUntil).getTime() < Date.now();

    if (!mySubHasBeenFetched || isExpired) {
      getMySubscription();
    }
  }, [user, mySubHasBeenFetched, mySubscription]);

  return {
    user,
    subscription: mySubscription,
    subscriptions,
    cancelSubscription,
    createSubscription,
    renewMySubscription,
    isLoading: loading,
    isSubscriptionValid:
      mySubscription &&
      new Date(mySubscription.validUntil).getTime() > Date.now(),
  };
};
