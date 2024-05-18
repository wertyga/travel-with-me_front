import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { SubscriptionList } from '@/components/Subscription';
import { useAuth } from '@/context';
import { useNavigation, useSubscription } from '@/hooks';
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { SCREENS } from '@/types';

const Subscriptions = () => {
  const navi = useNavigation();
  const {
    subscription,
    subscriptions,
    createSubscription,
    cancelSubscription,
    renewMySubscription,
    isLoading: subLoading,
  } = useSubscription({ withList: true, withRetrySubscriptionFetching: true });
  const { user, setBackScreen } = useAuth();

  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading: paymentLoading,
  } = usePaymentSheet();

  const initializePaymentSheet = async (subscriptionId: string) => {
    const { data, error: fetchError } = await createSubscription({
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

  const onBuy = async (subscriptionId: string) => {
    if (!user) {
      setBackScreen(SCREENS.Subscriptions);
      navi.navigate(SCREENS.Login);
      return;
    }

    try {
      await initializePaymentSheet(subscriptionId);
      await presentPaymentSheet();
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e?.message || e,
      });
    }
  };

  const isLoading = paymentLoading || subLoading;
  const isSubscriptionCanceled = !!subscription && subscription.isCanceled;
  const isShowCancelAction = !!subscription && !subscription.isCanceled;
  const urlSchema =
    Constants.appOwnership === 'expo'
      ? Linking.createURL('/--/')
      : Linking.createURL('');

  return (
    <MainLayout headerTitle="Subscription" isLoading={isLoading}>
      <StripeProvider
        publishableKey={Constants.expoConfig?.extra.PUBLIC_STRIPE_KEY}
        merchantIdentifier="com.wertyga.travel-with-me"
        urlScheme={urlSchema}
      >
        <SubscriptionList
          onBuy={onBuy}
          subscriptions={subscriptions}
          disabledIntervals={[subscription?.interval]}
        />
      </StripeProvider>

      {isShowCancelAction && (
        <Button
          onPress={cancelSubscription}
          filled
          high
          rectangle
          style={styles.cancelBtn}
        >
          Cancel My Subscription
        </Button>
      )}
      {isSubscriptionCanceled && (
        <Button
          onPress={renewMySubscription}
          filled
          high
          rectangle
          style={styles.cancelBtn}
        >
          Renew My Subscription
        </Button>
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  cancelBtn: {
    marginTop: 50,
  },
});

export default Subscriptions;
