export type Country = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  code: string;
  flag: string;
  guides: any[];
  cities: any[];
  guidesCount?: number;
  coords: {
    lat: number;
    lng: number;
  };
};
