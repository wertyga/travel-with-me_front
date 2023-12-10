import { StyleSheet } from 'react-native';
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';
import { useCallback, useLayoutEffect } from 'react';
import { SubscriptionList } from '@/components/Subscription';
import { Loader } from '@/components/Loader';
import { MainLayout } from '@/Layouts';
import {
  useCreateSubscriptionPaymentMutation,
  useLazyGetSubscriptionListQuery,
} from '@/api';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Subscriptions = () => {
  const { user } = useAuth();
  const navi = useNavigation();

  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const [createSub, { isLoading: fetchLoading }] =
    useCreateSubscriptionPaymentMutation();
  const [
    fetchSubscriptions,
    { data: { subscriptions = [] } = {}, isFetching: refetchLoading },
  ] = useLazyGetSubscriptionListQuery();

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

  useFocusEffect(
    useCallback(() => {
      fetchSubscriptions();
    }, [])
  );

  const onBuy = async (subscriptionId: string) => {
    try {
      const { data } = await fetchSubscriptions();
      const isSubscriptionDisabled = data?.subscriptions?.find(
        sub => sub.id === subscriptionId && sub.isDisabled
      );

      if (isSubscriptionDisabled) {
        return;
      }

      await initializePaymentSheet(subscriptionId);
      await presentPaymentSheet();
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

  const isLoading = loading || fetchLoading || refetchLoading;
  return (
    <MainLayout>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK_KEY}
        merchantIdentifier="com.wertyga.travel-with-me"
      >
        {isLoading && <Loader />}
        <SubscriptionList onBuy={onBuy} subscriptions={subscriptions} />
      </StripeProvider>
    </MainLayout>
  );
};

export default Subscriptions;
