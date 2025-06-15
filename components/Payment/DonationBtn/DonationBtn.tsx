import { useState } from 'react';

import { View } from 'react-native';

import Constants from 'expo-constants';
import * as Linking from 'expo-linking';

import { AppStateStore } from '@/mobx/stores';

import Button from '@/components/Button';
import { Modal } from '@/components/Common/Modal/Modal';
import { DonationList } from '@/components/Payment/DonationBtn/DonationList';
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';

export const DonationBtn = () => {
  const [isOpened, setIsOpened] = useState(false);

  const { ENV } = AppStateStore;
  const urlSchema = Linking.createURL('/--/');

  return (
    <StripeProvider
      publishableKey={ENV.stripePk}
      merchantIdentifier="com.wertyga.travel-with-me"
      urlScheme={urlSchema}
    >
      <View>
        <Button onPress={() => setIsOpened(true)} light>
          Donate
        </Button>
        <Modal
          visible={isOpened}
          onClose={() => setIsOpened(false)}
          title={`Donate to Vasia`}
        >
          <View
            style={{
              height: 50,
            }}
          />
          <DonationList />
        </Modal>
      </View>
    </StripeProvider>
  );
};
