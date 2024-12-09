import { baseQuery } from '@/app/query';

import { CURRENCY, City, Path, PriceMatrixItem } from '@/types';

export const fetchAviaMonthPriceMatrix = async (params: {
  originCoords: Path;
  destination: string;
}): Promise<{
  data: PriceMatrixItem[];
  currency: CURRENCY;
  originCity: City;
}> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/avia/week-matrix',
    params,
  });

  return data;
};
