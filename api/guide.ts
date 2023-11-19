import { baseApi } from '@/app/query';
import { GUIDE_TAGS } from '@/types';

export const guideApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getGuidesCategories: build.query<{ categories: string[] }, void>({
      provideTags: result => (result ? [GUIDE_TAGS.Categories] : []),
      query: () => {
        return {
          method: 'get',
          url: '/guide/categories',
        };
      },
    }),
  }),
});

export const { useGetGuidesCategoriesQuery } = guideApi;
