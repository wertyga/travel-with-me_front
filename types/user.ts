import { Guide } from '@/types/guide';
import { Place } from '@/types/place';
import { Like } from './likes';

export enum USER_TAGS {
  User = 'User',
  List = 'UsersList',
}

export enum USER_TYPES {
  TEMPORARY = 'TEMPORARY',
  RECOVERING = 'RECOVERING',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type User = {
  createdAt: string;
  updatedAt: string;
  _id: string;
  username: string;
  email: string;
  token: string;
  country: string;
  city: string;
  likes: Like;
  subscribers: Like;
  subscriptions: Like;
  avatar: string;
  status: USER_TYPES;
  slug: string;
  story: string;
};

export type UserFavoritesResponse = {
  guides: Guide[];
  places: Place[];
};
