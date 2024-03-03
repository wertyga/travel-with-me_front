import { router } from 'expo-router';

export const navigateToError = (error: any) => {
  router.navigate({
    params: { error: error.message },
    pathname: '/error',
  });
};
