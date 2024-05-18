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
};

export type GetPlaceResponse = {
  place: Place;
  guide: Guide;
};
