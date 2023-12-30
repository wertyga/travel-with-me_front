import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useHandleFromError = (
  route,
  refetch: () => void,
  isFetching?: boolean
) => {
  useFocusEffect(
    useCallback(() => {
      if (!route.params?.isFromError || isFetching) return;
      refetch();
    }, [route.params?.isFromError])
  );
};
