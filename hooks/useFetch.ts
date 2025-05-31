import { useCallback, useState } from 'react';

export const useFetch = <F extends (...args: any[]) => Promise<any>>(
  func: F
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<F>> | undefined>(
    undefined
  );

  const fetchFunc = useCallback(
    async (...args: Parameters<F>) => {
      setIsLoading(true);

      try {
        const result = await func(...args);

        setData(result);

        return result;
      } finally {
        setIsLoading(false);
      }
    },
    [func]
  );

  return [fetchFunc, { isLoading, data }] as const;
};
