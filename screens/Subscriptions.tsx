import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { AppStateStore } from '@/mobx/stores';
import { observer } from 'mobx-react-lite';
import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { SubscriptionList } from '@/components/Subscription';
import { useNavigation, useSubscription } from '@/hooks';
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';
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
    user,
  } = useSubscription({ withList: true, withRetrySubscriptionFetching: true });

  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading: paymentLoading,
  } = usePaymentSheet();

  const initializePaymentSheet = async (subscriptionId: string) => {
    const data = await createSubscription({
      subscription: subscriptionId,
    });

    const { customer, ephemeralKey, clientSecret } = data || {};
    if (!data) return;

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
      navi.navigate(SCREENS.Login);
      return;
    }

    try {
      await initializePaymentSheet(subscriptionId);
      const result = await presentPaymentSheet();

      if (result.error) {
        throw result.error;
      }
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: e.message || e,
      });
    }
  };

  const { ENV } = AppStateStore;
  const isLoading = paymentLoading || subLoading;
  const isSubscriptionCanceled = !!subscription && subscription.isCanceled;
  const isShowCancelAction = !!subscription && !subscription.isCanceled;
  const urlSchema =
    Constants.appOwnership === 'expo'
      ? Linking.createURL('/--/')
      : Linking.createURL('');

  if (!ENV.stripePk) {
    return (
      <MainLayout headerTitle="Subscriptions" isLoading={isLoading}>
        <CText style={{ textAlign: 'center' }}>
          Subscriptions Under Maintenance Now
        </CText>
      </MainLayout>
    );
  }

  return (
    <MainLayout headerTitle="Subscription" isLoading={isLoading}>
      <StripeProvider
        publishableKey={ENV.stripePk}
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

export default observer(Subscriptions);
