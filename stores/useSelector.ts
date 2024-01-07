import { useSelector as useReduxSelector } from 'react-redux';
import { RootStore } from '@/types';

export const useSelector = <OUTPUT = any>(
  selector: (s: Partial<RootStore>) => OUTPUT
) => {
  return useReduxSelector<RootStore, OUTPUT>(selector);
};

// const { isInBasket } = useSelector<RootStore, { isInBasket: boolean }>(
// 	({ basket }) => {
// 		return {
// 			isInBasket: !!basket.products.find(product => product.id === productId),
// 		};
// 	},
// );
