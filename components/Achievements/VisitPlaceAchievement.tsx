import React from 'react';

import { AchievementWrapper } from '@/components/Achievements/AchievementWrapper';
import { VisitPlaceAchievementItem } from '@/components/Achievements/VisitPlaceAchievementItem';

import { Achievement, Place } from '@/types';

type Props = {
  achievements: Achievement[];
};

export const VisitPlaceAchievement = ({ achievements }: Props) => {
  return (
    <AchievementWrapper>
      {achievements.map((achieve, i) => {
        const image = (achieve.entity as Place)?.images[0];
        return (
          <VisitPlaceAchievementItem
            key={`${achieve?.entity._id}-${i}`}
            image={image}
            title={achieve.entity?.title}
            slug={achieve.entity?.slug}
            createdAt={achieve.createdAt}
          />
        );
      })}
    </AchievementWrapper>
  );
};
