import { NavigationProp } from '@react-navigation/core/src/types';
import { useNavigation as useNativeNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/app/Navigator';
import { SCREENS } from '@/types';

export const useNavigation = () => {
  const navi = useNativeNavigation<NavigationProp<RootStackParamList>>();

  return {
    ...navi,
    navigate: (screen: SCREENS, params?: Record<string, any>) => {
      // @ts-ignore
      return navi.navigate(screen, params);
    },
    replace: (screen: SCREENS, params?: Record<string, any>) => {
      // @ts-ignore
      return navi.replace(screen, params);
    },
  };
};
