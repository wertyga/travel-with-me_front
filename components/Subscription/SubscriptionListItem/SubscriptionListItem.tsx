import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SubscriptionPreview } from '@/types';
import { getCurrencyMeta } from '@/utils';
import { CONSTANTS } from '@/styles/constants';

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

  const { name, id, price, description } = subscription;
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{`${price.amount} ${getCurrencyMeta(price.currency).sign}`}</Text>
      <TouchableOpacity
        onPress={handleBuy(id)}
        style={{
          ...styles.buyBtn,
          ...(isDisabled ? styles.buyBtnDisabled : {}),
        }}
        disabled={isDisabled}
      >
        <Text>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buyBtn: {
    marginTop: 10,
    paddingVertical: 10,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: CONSTANTS.colors.blue,
  },
  buyBtnDisabled: {
    backgroundColor: 'grey',
  },
});
