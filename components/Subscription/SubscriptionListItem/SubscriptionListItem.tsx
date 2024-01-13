import { View, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { getCurrencyMeta } from '@/utils';
import { CONSTANTS } from '@/styles/constants';
import { FONTS, SubscriptionPreview } from '@/types';
import { CText } from '@/components/CText';

type Props = {
  subscription: SubscriptionPreview;
  onBuy: (subscriptionId: string) => void;
  isDisabled?: boolean;
};

export const SubscriptionListItem = ({
  subscription,
  onBuy,
  isDisabled,
}: Props) => {
  const handleBuy = (id: string) => () => {
    onBuy(id);
  };

  const { name, id, price, description, interval } = subscription;
  return (
    <View style={styles.container}>
      <CText style={styles.name}>{name}</CText>
      <CText style={styles.description}>{description}</CText>
      <CText style={styles.price}>{`${price.amount} ${
        getCurrencyMeta(price.currency).sign
      }/${interval.slice(0, 2)}`}</CText>
      <Button onPress={handleBuy(id)} filled disabled={isDisabled}>
        {isDisabled ? 'Your subscription' : 'Subscribe'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  price: {
    color: CONSTANTS.colors.ultramarine,
    fontSize: 52,
    fontFamily: FONTS.CrimsonSemiBold,
  },
  name: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
  },
  description: {
    fontSize: 12,
  },
});
