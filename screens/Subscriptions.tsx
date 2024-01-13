import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SubscriptionList } from '@/components/Subscription';
import { Loader } from '@/components/Loader';
import Button from '@/components/Button';
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
import { useAuthGuard, useSubscription } from '@/hooks';

const Subscriptions = () => {
  const user = useAuthGuard();
  const { subscription } = useSubscription();

  const [pollingIntervalForRefetchMySubscription, setPollingInterval] =
    useState(0);

  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  const [createSub, { isLoading: fetchLoading }] =
    useCreateSubscriptionPaymentMutation();
  const { data: { subscriptions = [] } = {}, isFetching: refetchLoading } =
    useGetSubscriptionListQuery(undefined, { skip: !user });

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

  // useFocusEffect(
  //   useCallback(() => {
  //     refetchMySubscription();
  //   }, [])
  // );

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

  const isLoading = loading || fetchLoading || refetchLoading || cancelLoading;
  const isShowCancelAction = !!subscription && !subscription.isCanceled;
  return (
    <MainLayout headerTitle="Subscription" style={styles.container}>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK_KEY}
        merchantIdentifier="com.wertyga.travel-with-me"
      >
        {isLoading && <Loader />}
        <SubscriptionList
          onBuy={onBuy}
          subscriptions={subscriptions}
          disabledIntervals={[subscription?.interval]}
        />
      </StripeProvider>

      {isShowCancelAction && (
        <Button onPress={cancelSubscription} filled style={styles.cancelBtn}>
          Cancel My Subscription
        </Button>
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
  cancelBtn: {
    marginTop: 50,
  },
});

export default Subscriptions;
