import { City } from '@/types/city';
import { Guide, Path } from '@/types/guide';
import { Like } from '@/types/likes';
import { User } from '@/types/user';

export enum PLACE_TAGS {
  Place = 'Place',
  List = 'PlaceList',
}

export type Place = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  story: string;
  audioStory: string;
  images: string[];
  coords: Path;
  owner: User;
  likes: Like;
  isChosen?: boolean;
  city: City;
  // Trip adviser data
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  rating?: number;
  workTime?: string[];
  //
};

export type GetPlaceResponse = {
  place: Place;
  guide: Guide;
};
