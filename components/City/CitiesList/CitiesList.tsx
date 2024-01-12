import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { City, SCREENS } from '@/types';
import { CityPreview } from '@/components/City';
import { useNavigation } from '@react-navigation/native';

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
            onPress={() => navi.navigate(SCREENS.Home, { city })}
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
