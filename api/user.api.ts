import { baseQuery } from '@/app/query';
import { User, UserFavoritesResponse } from '@/types/user';

export const fetchSelfUser = async (): Promise<User> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/users/self',
    silentError: true,
  });

  return data;
};

export const fetchFavorites = async (): Promise<UserFavoritesResponse> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/users/favorites',
  });

  return data;
};
