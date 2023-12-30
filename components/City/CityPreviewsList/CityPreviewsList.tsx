import { ScrollView } from 'react-native';
import { City } from '@/types';
import { CityPreview } from '../CityPreview/CityPreview';

type Props = {
  cities: City[];
};

export const CityPreviewsList = ({ cities }: Props) => {
  return (
    <ScrollView>
      {cities.map(city => {
        return <CityPreview city={city} key={city._id} />;
      })}
    </ScrollView>
  );
};
