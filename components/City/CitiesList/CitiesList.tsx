import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { City } from '@/types';
import { CityPreview } from '../CityPreview/CityPreview';

type Props = {
  cities: City[];
  style?: StyleProp<ViewStyle>;
};

export const CitiesList = ({ cities, style }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.list} style={style}>
      {cities.map(city => {
        return <CityPreview city={city} key={city._id} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 10,
    paddingBottom: 200,
  },
});
