import { useSelector as useReduxSelector } from 'react-redux';
import { RootStore } from '@/types';

export const useSelector = <OUTPUT = unknown>(
  selector: (s: Partial<RootStore>) => OUTPUT
) => {
  return useReduxSelector<RootStore, OUTPUT>(selector);
};
