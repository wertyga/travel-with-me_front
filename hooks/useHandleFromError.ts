import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export const useHandleFromError = (
  refetch: () => void,
  isFetching?: boolean
) => {
  const { params } = useRoute();

  useFocusEffect(
    useCallback(() => {
      if (!(params as any)?.isFromError || isFetching) return;

      refetch();
    }, [(params as any)?.isFromError])
  );
};
