import { CURRENCY } from '@/types';

export const getCurrencyMeta = (currency: CURRENCY) => {
  let sign = '';

  switch (currency) {
    case CURRENCY.Usd:
      sign = '$';
      break;

    default:
      break;
  }

  return {
    sign,
  };
};
