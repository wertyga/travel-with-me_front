import { baseQuery } from '@/app/query';
import { GetCitiesListRequest, GetCitiesListResponse } from '@/types';

export const fetchLightCityList = async (): Promise<GetCitiesListResponse> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/city/light-list',
  });

  return data;
};

export const fetchCityList = async (
  params: GetCitiesListRequest
): Promise<GetCitiesListResponse> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/city/list',
    params,
  });

  return data;
};
