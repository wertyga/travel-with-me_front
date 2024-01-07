import { baseApi } from '@/app/query';
import { City, Guide, GUIDE_TAGS } from '@/types';

export const guideApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getGuidesCategories: build.query<{ categories: string[] }, void>({
      providesTags: result => (result ? [GUIDE_TAGS.Categories] : []),
      query: () => {
        return {
          method: 'get',
          url: '/guide/categories',
        };
      },
    }),
    getGuide: build.query<Guide, { slug: string }>({
      providesTags: result =>
        result ? [{ type: GUIDE_TAGS.Guide, id: result._id }] : [],
      query: params => {
        return {
          method: 'get',
          url: `/guide`,
          params,
        };
      },
    }),
    getGuidesCount: build.query<City[], void>({
      query: () => {
        return {
          method: 'get',
          url: '/guide/count',
        };
      },
    }),
  }),
});

export const {
  useGetGuidesCategoriesQuery,
  useGetGuideQuery,
  useGetGuidesCountQuery,
  useLazyGetGuideQuery,
} = guideApi;
