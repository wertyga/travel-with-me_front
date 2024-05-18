import { StyleSheet, View } from 'react-native';
import { SubscriptionPreview } from '@/types';
import { SubscriptionListItem } from '../SubscriptionListItem/SubscriptionListItem';

type Props = {
  onBuy: (subscriptionId: string) => void;
  subscriptions: SubscriptionPreview[];
  disabledIntervals?: string[];
};

export const SubscriptionList = ({
  onBuy,
  subscriptions,
  disabledIntervals = [],
}: Props) => {
  return (
    <View style={styles.container}>
      {subscriptions.map(sub => (
        <SubscriptionListItem
          subscription={sub}
          key={sub.id}
          onBuy={onBuy}
          isDisabled={disabledIntervals?.includes(sub.interval)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 20,
  },
});
