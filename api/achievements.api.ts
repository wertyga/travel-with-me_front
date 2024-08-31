import { baseQuery } from '@/app/query';

import { Achievement, AchievementTypes } from '@/types';

export const fetchReachPlaceAchievement = async (params: {
  placeId: string;
}): Promise<{ achievement: Achievement }> => {
  const { data } = await baseQuery({
    method: 'post',
    url: '/achievements/reach-place',
    data: params,
  });

  return data;
};

export const fetchAchievement = async (params: {
  _id: string;
}): Promise<{ achievement: Achievement }> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/achievements/achievement',
    params,
  });

  return data;
};

export const fetchUserAchievements = async (): Promise<{
  achievements: Record<AchievementTypes, Achievement[]>;
}> => {
  const { data } = await baseQuery(
    {
      method: 'get',
      url: '/achievements',
    },
    []
  );

  return data;
};
