import { User } from '@/types/user';
import { Like } from '@/types/likes';
import { Path } from '@/types/guide';

export enum PLACE_TAGS {
  Place = 'Place',
  List = 'PlaceList',
}

export type Place = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  images: string[];
  coords: Path;
  owner: User;
  likes: Like;
};
