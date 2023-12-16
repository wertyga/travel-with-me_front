import { TouchableOpacity, Text } from 'react-native';
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SubscriptionList } from '@/components/Subscription';
import { Loader } from '@/components/Loader';
import { MainLayout } from '@/Layouts';
import {
  useCreateSubscriptionPaymentMutation,
  useCancelUserSubscriptionMutation,
  useGetMySubscriptionQuery,
  useGetSubscriptionListQuery,
} from '@/api';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Subscriptions = () => {
  const { user } = useAuth();
  const navi = useNavigation();
  const [pollingIntervalForRefetchMySubscription, setPollingInterval] =
    useState(0);

  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  const {
    data: {
      subscription: mySubscription,
      disabledSubscriptionsIntervals = [],
    } = {},
    refetch: refetchMySubscription,
  } = useGetMySubscriptionQuery(
    { isActive: true },
    { pollingInterval: pollingIntervalForRefetchMySubscription }
  );

  const [createSub, { isLoading: fetchLoading }] =
    useCreateSubscriptionPaymentMutation();
  const { data: { subscriptions = [] } = {}, isFetching: refetchLoading } =
    useGetSubscriptionListQuery();

  const [cancelSubscription, { isLoading: cancelLoading }] =
    useCancelUserSubscriptionMutation();

  const initializePaymentSheet = async (subscriptionId: string) => {
    const { data, error: fetchError } = await createSub({
      subscription: subscriptionId,
    });
    if (fetchError) throw fetchError;

    const { customer, ephemeralKey, clientSecret } = data;
    if (!clientSecret) {
      // If no clientSecret - it mean that payment has been takes from the user's stripe available balance
      return;
    }

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Travel With Me',
    });

    if (error) throw error;
  };

  const stopPolling = () => {
    setPollingInterval(0);
  };

  useFocusEffect(useCallback(refetchMySubscription, []));

  useEffect(() => {
    return stopPolling;
  }, []);

  const onBuy = async (subscriptionId: string) => {
    try {
      await initializePaymentSheet(subscriptionId);
      await presentPaymentSheet();
      setPollingInterval(1000);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e?.message || e,
      });
    }
  };

  useLayoutEffect(() => {
    if (!user) {
      navi.navigate('Login');
    }
  }, []);

  const isLoading = loading || fetchLoading || refetchLoading || cancelLoading;
  const isShowCancelAction = !!mySubscription && !mySubscription.isCanceled;
  return (
    <MainLayout>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK_KEY}
        merchantIdentifier="com.wertyga.travel-with-me"
      >
        {isLoading && <Loader />}
        <SubscriptionList
          onBuy={onBuy}
          subscriptions={subscriptions}
          disabledIntervals={disabledSubscriptionsIntervals}
        />
      </StripeProvider>

      {isShowCancelAction && (
        <TouchableOpacity
          className={`p-2 mt-2 items-center bg-red-400`}
          onPress={cancelSubscription}
        >
          <Text>Cancel My Subscription</Text>
        </TouchableOpacity>
      )}
    </MainLayout>
  );
};

export default Subscriptions;
