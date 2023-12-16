import { baseApi } from '@/app/query';
import { Guide, GUIDE_TAGS } from '@/types';

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
  }),
});

export const {
  useGetGuidesCategoriesQuery,
  useGetGuideQuery,
  useLazyGetGuideQuery,
} = guideApi;
