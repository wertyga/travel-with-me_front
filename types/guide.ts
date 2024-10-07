import { City } from '@/types/city';
import { Country } from '@/types/country';
import { Like } from '@/types/likes';
import { Place } from '@/types/place';
import { User } from '@/types/user';

export enum GUIDE_TAGS {
  Guide = 'Guide',
  List = 'GuidesList',
  Categories = 'GuidesCategories',
}

export enum CURRENCY {
  Usd = 'USD',
  Eur = 'EUR',
}

export type Price = {
  amount: number;
  currency: CURRENCY;
};

export type Path = {
  lng: number;
  lat: number;
};

export type Guide = {
  _id: string;
  title: string;
  description: string;
  vImage: string;
  hImage: string;
  travelTime: string;
  slug: string;
  categories: string[];
  owner: User;
  city: City;
  country: Country;
  likes: Like;
  routes: Path[];
  points: Place[];
  createdAt: string;
  pointsCount?: number;
};
