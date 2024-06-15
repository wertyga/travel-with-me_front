import { useFocus } from '@/hooks/useFocus';
import { useNavigation } from '@/hooks/useNavigation';
import { useStores } from '@/hooks/useStores';
import { SCREENS } from '@/types';

export const useSubscriptionGuard = () => {
  const navi = useNavigation();

  const { mySubscription, isAppReady } = useStores(stores => ({
    mySubscription: stores.subscriptionStore.mySubscription,
    isAppReady: stores.appStateStore.isAppReady,
  }));

  useFocus(() => {
    if (isAppReady && !mySubscription) {
      navi.replace(SCREENS.CitiesList);
    }
  }, [isAppReady, mySubscription]);

  return null;
};
