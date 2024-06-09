import { useLayoutEffect } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { useStores } from '@/hooks/useStores';
import { SCREENS } from '@/types';

export const useAuthGuard = () => {
  const navi = useNavigation();
  const { user } = useStores(stores => ({
    user: stores.userStore.user,
  }));

  useLayoutEffect(() => {
    if (!user) {
      navi.replace(SCREENS.Login);
    }
  }, [user]);

  return null;
};
