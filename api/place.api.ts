import { baseQuery } from '@/app/query';
import { GetPlaceResponse } from '@/types';

export const fetchPlace = async (params: {
  slug: string;
}): Promise<GetPlaceResponse> => {
  const { data: response } = await baseQuery({
    method: 'get',
    url: '/place',
    params,
  });

  return response;
};
