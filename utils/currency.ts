import { CURRENCY } from '@/types';

export const getCurrencyMeta = (currency: CURRENCY) => {
  let sign = '';

  switch (currency) {
    case CURRENCY.Usd:
      sign = '$';
      break;
    case CURRENCY.Eur:
      sign = '€';
      break;

    default:
      break;
  }

  return {
    sign,
  };
};
