import { SortAndPaginationRequest } from '@/types/api';
import { Country } from '@/types/country';
import { Guide, Path } from '@/types/guide';

export enum CITY_TAGS {
  'City' = 'City',
  'List' = 'CitiesList',
  'LightList' = 'CitiesLightList',
}

export type SquareCoords = {
  sw: Path;
  se: Path;
  nw: Path;
  ne: Path;
};

export type CitySecurityType = {
  overview: string;
  emergency: {
    police: string;
    ambulance: string;
    fireDepartment: string;
    touristPolice?: string;
  };
};

export type CityPublicTransport = {
  overview: string;
  apps: { name: string; description: string; link: string }[];
};

export type City = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  history: string;
  security: CitySecurityType;
  transport: CityPublicTransport;
  country: Country;
  guides: Guide[];
  image: string;
  pointsCount?: number;
  guidesCount?: number;
  coords: {
    lat: number;
    lng: number;
  };
  squareCoords: SquareCoords;
};

export type GetCitiesListRequest = SortAndPaginationRequest & {};
export type GetCitiesListResponse = {
  cities: City[];
  total: number;
};
