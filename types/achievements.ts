import { City } from './city';
import { SOCIAL_MODELS } from './likes';
import { Place } from './place';
import { User } from './user';

export enum AchievementTypes {
  VisitPlace = 'VisitPlace',
  VisitCity = 'VisitCity',
}

export type Achievement = {
  owner: User;
  type: AchievementTypes;
  model: SOCIAL_MODELS;
  createdAt: string;
  entity: Place | City;
};
