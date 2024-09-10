import { baseQuery } from '@/app/query';

import { Path, SuccessResponse } from '@/types';
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

export const updateSelf = async (userData: Partial<User>): Promise<User> => {
  const {
    data: { user },
  } = await baseQuery({
    method: 'put',
    url: '/users/update',
    data: userData,
  });

  return user;
};

export const updateSelfLastCoords = async (
  coords: Path
): Promise<SuccessResponse> => {
  const { data } = await baseQuery({
    method: 'post',
    url: '/users/last-coords',
    data: coords,
    silentError: true,
  });

  return data;
};

export const fetchUsersNearMe = async (): Promise<{ users: User[] }> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/users/users-near-me',
  });

  return data;
};
