import { baseQuery } from '@/app/query';
import { City } from '@/types';

export const fetchCity = async (params: {
  slug?: string;
  _id?: string;
}): Promise<{ city: City }> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/city',
    params,
  });

  return data;
};
