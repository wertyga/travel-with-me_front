import { SCREENS } from '@/types';

export const navigateToError = (navi: any, error: any) => {
  navi.navigate(SCREENS.Error, { error: error.message });
};
