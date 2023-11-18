import { NavigationProp } from '@react-navigation/core/src/types';

export const navigateToError = (
  navi: NavigationProp<ReactNavigation.RootParamList>,
  error: any
) => {
  navi.navigate('Error', { error: error.message });
};
