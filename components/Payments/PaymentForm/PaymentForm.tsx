import { useEffect } from 'react';
import { Text, View } from 'react-native';
import {
  StripeProvider,
  initStripe,
  usePaymentSheet,
} from '@stripe/stripe-react-native';
import { useGetPaymentSheetMutation } from '@/api';

const ContentForm = () => {
  return (
    <View>
      <Text>Payment</Text>
    </View>
  );
};

export const PaymentForm = ({ subscriptionId }) => {
  const [fetchPaymentSheet] = useGetPaymentSheetMutation();

  const initializePaymentSheet = () => {
    const {} = fetchPaymentSheet({ subscription: subscriptionId });
  };

  useEffect(() => {
    initStripe({
      publishableKey: process.env.EXPO_PUBLIC_STRIPE_PK_KEY,
      urlScheme: 'com.wertyga.travel-with-me',
    });
  }, []);

  return (
    <View>
      <Text>Payment</Text>
    </View>
  );
};
