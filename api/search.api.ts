import { baseQuery } from '@/app/query';
import { GetGlobalSearchRequest, GetGlobalSearchResponse } from '@/types';

export const fetchGlobalSearch = async (
  params: GetGlobalSearchRequest
): Promise<GetGlobalSearchResponse> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/search',
    params,
  });

  return data;
};
