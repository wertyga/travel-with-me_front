import { StyleSheet, View } from 'react-native';
import { SubscriptionListItem } from '../SubscriptionListItem/SubscriptionListItem';
import { SubscriptionPreview } from '@/types';

type Props = {
  onBuy: (subscriptionId: string) => void;
  subscriptions: SubscriptionPreview[];
};

export const SubscriptionList = ({ onBuy, subscriptions }: Props) => {
  return (
    <View style={styles.container}>
      {subscriptions.map(sub => (
        <SubscriptionListItem
          subscription={sub}
          key={sub.id}
          onBuy={onBuy}
          isDisabled={sub.isDisabled}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
  },
});
