import { FC, useState } from 'react';

import { View } from 'react-native';

import { donationPaymentApi } from '@/api';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { Input } from '@/components/Input';

import { CURRENCY } from '@/types';

type TDonationListProps = {
  // amount: number;
  // setAmount: (amount: string) => void;
};

export const DonationList: FC<TDonationListProps> = ({}) => {
  const [amount, setAmount] = useState(20);

  const donate = async () => {
    try {
      await donationPaymentApi(
        { amount, currency: CURRENCY.Eur },
        '65218e1ae5fb86c0341258a7'
      );
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <Input
          value={amount.toString()}
          onChange={value => setAmount(+value)}
          keyboardType="numeric"
          style={{
            width: 60,
          }}
        />

        <CText light>{CURRENCY.Eur}</CText>
      </View>

      <Button rectangle high filled onPress={donate}>
        Confirm
      </Button>
    </View>
  );
};
