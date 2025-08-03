import { useRoute } from '@react-navigation/native';

import { ParamsListType, RootStackParamList, SCREENS } from '@/types';

export const useParams = <
  T extends keyof typeof SCREENS,
>(): ParamsListType<T> => {
  const router = useRoute();

  return (router.params ?? {}) as ParamsListType<T>;
};
