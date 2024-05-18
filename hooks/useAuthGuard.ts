import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/context';
import { SCREENS } from '@/types';

export const useAuthGuard = () => {
  const navi = useNavigation();
  const { user } = useAuth();

  useLayoutEffect(() => {
    if (!user) {
      navi.replace(SCREENS.Login);
    }
  }, [user]);

  return user;
};
