import { useEffect, useState } from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import OfflineCityItem from '@/components/User/OfflineCity/OfflineCityItem/OfflineCityItem';
import { useNavigation, useStores } from '@/hooks';

import { SCREENS } from '@/types';

const OfflineStorage = () => {
  const nav = useNavigation();
  const [cities, setCities] = useState([]);

  const { getOfflineCities, cachedCitiesIds } = useStores(stores => ({
    getOfflineCities: stores.offlineStore.getCities,
    cachedCitiesIds: stores.offlineStore.cachedCitiesIds,
  }));

  useEffect(() => {
    const fetchCities = async () => {
      const offlineCities = await getOfflineCities();

      if (!offlineCities.length) {
        nav.navigate(SCREENS.Profile);
        return;
      }

      setCities(
        offlineCities.map(city => ({
          _id: city._id,
          slug: city.slug,
          title: city.title,
          image: city.image,
          country: city.country,
        }))
      );
    };

    fetchCities();
  }, [cachedCitiesIds]);

  return (
    <MainLayout headerTitle="Offline Storage" withBackButton>
      <ScrollView contentContainerStyle={styles.content}>
        {cities.map(city => {
          return <OfflineCityItem key={city._id} city={city} />;
        })}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 10,
  },
});

export default observer(OfflineStorage);
