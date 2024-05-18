import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@/hooks';
import { City, SCREENS } from '@/types';
import { CityPreview } from '../CityPreview/CityPreview';

type Props = {
  cities: City[];
};

export const CitiesList = ({ cities }: Props) => {
  const navi = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {cities.map(city => {
        return (
          <TouchableOpacity
            key={city._id}
            style={styles.preview}
            onPress={() =>
              navi.navigate(SCREENS.City, {
                city,
              })
            }
          >
            <CityPreview city={city} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    paddingBottom: 20,
  },
  preview: {
    width: '46%',
  },
});
