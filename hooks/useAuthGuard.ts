import { useFocus } from '@/hooks/useFocus';
import { useNavigation } from '@/hooks/useNavigation';
import { useStores } from '@/hooks/useStores';

import { SCREENS } from '@/types';

export const useAuthGuard = () => {
  const navi = useNavigation();
  const { user } = useStores(stores => ({
    user: stores.userStore.user,
  }));

  useFocus(() => {
    if (!user) {
      navi.replace(SCREENS.Login);
    }
  }, [user]);

  return null;
};
