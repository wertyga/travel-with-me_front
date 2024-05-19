import { SortAndPaginationRequest } from '@/types/api';
import { Country } from '@/types/country';
import { Guide } from '@/types/guide';

export enum CITY_TAGS {
  'City' = 'City',
  'List' = 'CitiesList',
  'LightList' = 'CitiesLightList',
}

export type City = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  history: string;
  security: string;
  transport: string;
  country: Country;
  guides: Guide[];
  image: string;
  pointsCount?: number;
  guidesCount?: number;
  coords: {
    lat: number;
    lng: number;
  };
};

export type GetCitiesListRequest = SortAndPaginationRequest & {};
export type GetCitiesListResponse = {
  cities: City[];
  total: number;
};
