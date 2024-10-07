import { baseQuery } from '@/app/query';

import { CURRENCY, PriceMatrixItem } from '@/types';

export const fetchAviaMonthPriceMatrix = async (params: {
  origin: string;
  destination: string;
}): Promise<{ data: PriceMatrixItem[]; currency: CURRENCY }> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/avia/week-matrix',
    params,
  });

  return data;
};
