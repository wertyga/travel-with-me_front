import { ScrollView, StyleSheet, ViewStyle } from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { observer } from 'mobx-react-lite';

import { useStores } from '@/hooks';

import { City } from '@/types';

import { CityPreview } from '../CityPreview/CityPreview';

type Props = {
  cities: City[];
  style?: StyleProp<ViewStyle>;
};

const CitiesList = ({ cities, style }: Props) => {
  const { isNetConnected, offlineCities } = useStores(stores => ({
    isNetConnected: stores.appStateStore.isNetConnected,
    offlineCities: stores.offlineStore.cities,
  }));

  const offlineCitiesIds = offlineCities.map(city => city._id);

  return (
    <ScrollView contentContainerStyle={styles.list} style={style}>
      {cities.map(city => {
        const isDisabled =
          !isNetConnected && !offlineCitiesIds.includes(city._id);
        return <CityPreview city={city} key={city._id} disabled={isDisabled} />;
      })}
    </ScrollView>
  );
};

export default observer(CitiesList);

const styles = StyleSheet.create({
  list: {
    gap: 10,
    paddingBottom: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
