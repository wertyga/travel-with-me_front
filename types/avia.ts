export type PriceMatrixItem = {
  depart_date: string;
  origin: string;
  destination: string;
  gate: string;
  return_date: string;
  found_at: string;
  trip_class: number;
  value: number;
  number_of_changes: number;
  duration: number;
  distance: number;
  show_to_affiliates: boolean;
  actual: boolean;
  originName: string;
  destinationName: string;
};
