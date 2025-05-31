import { ScrollView, StyleSheet, ViewStyle } from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { observer } from 'mobx-react-lite';

import { City } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import { CityPreview } from '../CityPreview/CityPreview';

type Props = {
  cities: City[];
  style?: StyleProp<ViewStyle>;
};

const CitiesList = ({ cities, style }: Props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.list}
      style={style}
      showsVerticalScrollIndicator={false}
    >
      {cities.map(city => {
        return <CityPreview city={city} key={city._id} />;
      })}
    </ScrollView>
  );
};

export default observer(CitiesList);

const styles = StyleSheet.create({
  list: {
    gap: 10,
    paddingBottom: CONSTANTS.spaces.footerHeight + 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
