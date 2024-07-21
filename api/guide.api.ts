import { baseQuery } from '@/app/query';

import {
  City,
  GetCitiesListRequest,
  GetCitiesListResponse,
  Guide,
} from '@/types';

export const fetchGuideCategories = async (): Promise<{
  categories: string[];
}> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/guide/categories',
  });

  return data;
};

export const fetchGuide = async (params: {
  slug: string;
  withStory?: boolean;
  withFullPoints?: boolean;
}): Promise<Guide> => {
  const { data } = await baseQuery({
    method: 'get',
    url: `/guide`,
    params,
  });

  return data;
};

export const fetchGuidesCount = async (): Promise<City[]> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/guide/count',
  });

  return data;
};

export const fetchGuidesList = async (params: {
  city?: string;
}): Promise<{ guides: Guide[]; total: number }> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/guide/list',
    params: {
      ...params,
      limit: 1000,
    },
  });

  return data;
};
