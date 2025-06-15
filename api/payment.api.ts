import { baseQuery } from '@/app/query';

import { Price } from '@/types';

export const donationPaymentApi = async (price: Price, payeeId: string) => {
  const { data: response } = await baseQuery({
    method: 'post',
    url: '/donation/pay',
    data: {
      ...price,
      payeeId,
    },
  });

  return response;
};
