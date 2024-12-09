import { baseQuery } from '@/app/query';

import { Path, SuccessResponse } from '@/types';
import { Language, User, UserFavoritesResponse } from '@/types/user';

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

export type UpdateUserReq = Partial<
  Omit<User, 'lastCity'> & { lastCity: string }
>;
export const updateSelf = async (userData: UpdateUserReq): Promise<User> => {
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
  const { data } = await baseQuery(
    {
      method: 'get',
      url: '/users/users-near-me',
    },
    { users: [] }
  );

  return data;
};

export const fetchUsersInTheCity = async (
  cityId: string
): Promise<{ users: User[] }> => {
  const { data } = await baseQuery(
    {
      method: 'get',
      url: '/users/users-in-the-city',
      params: {
        city: cityId,
      },
    },
    { users: [] }
  );

  return data;
};

export const fetchLanguages = async (): Promise<{ languages: Language[] }> => {
  const { data } = await baseQuery(
    {
      method: 'get',
      url: '/users/languages',
    },
    { languages: [] }
  );

  return data;
};
