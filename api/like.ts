import { baseApi } from '@/app/query';
import {
  GUIDE_TAGS,
  PLACE_TAGS,
  SOCIAL_MODELS,
  SetLikeRequest,
  SetLikeResponse,
  USER_TAGS,
} from '@/types';

export const likeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    setLike: build.mutation<SetLikeResponse, SetLikeRequest>({
      invalidatesTags: (result, error, { modelType, _id }) => {
        if (!result) return [];

        let tag;
        switch (modelType) {
          case SOCIAL_MODELS.Guide:
            tag = GUIDE_TAGS.Guide;
            break;
          case SOCIAL_MODELS.Place:
            tag = PLACE_TAGS.Place;
            break;

          default:
            break;
        }

        if (!tag) return [];

        return [{ type: tag, id: result._id }, USER_TAGS.Favorites];
      },
      query: data => {
        return {
          method: 'post',
          url: '/like',
          data,
        };
      },
    }),
  }),
});

export const { useSetLikeMutation } = likeApi;
