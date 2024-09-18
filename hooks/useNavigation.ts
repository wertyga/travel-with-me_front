import { NavigationProp } from '@react-navigation/core/src/types';
import { useNavigation as useNativeNavigation } from '@react-navigation/native';

import { RootStackParamList, SCREENS, getLastRoute } from '@/types';

export const useNavigation = () => {
  const navi = useNativeNavigation<NavigationProp<RootStackParamList>>();

  return {
    ...navi,
    navigate: (screen: SCREENS, params?: Record<string, any>) => {
      const state = navi.getState();
      const { name, params: lastRouteParams } = getLastRoute(state);

      if (
        name === screen &&
        JSON.stringify(params || null) ===
          JSON.stringify(lastRouteParams || null)
      ) {
        return;
      }

      // @ts-ignore
      return navi.navigate(screen, params);
    },
    replace: (screen: SCREENS, params?: Record<string, any>) => {
      // @ts-ignore
      return navi.replace(screen, params);
    },
  };
};
