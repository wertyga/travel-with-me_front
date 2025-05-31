import { useEffect } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { useStores } from '@/hooks';

import { SCREENS } from '@/types';

import CityPlaceholder from '@/assets/images/city_placeholder.png';
import GuidePlaceholder from '@/assets/images/guide_placeholder.png';

import Search from '../Search';
import { GlobalSearchItem } from './GlobalSearchItem';

export const GlobalSearchComponent = () => {
  const { isLoading, global, dropStore, getGlobalSearch, currentRoute } =
    useStores(stores => ({
      global: stores.searchStore.global,
      isLoading: stores.searchStore.isLoading,
      dropStore: stores.searchStore.dropStore,
      getGlobalSearch: stores.searchStore.getGlobalSearch,
      currentRoute: stores.routerStore.currentRoute,
    }));

  const onClose = () => {
    dropStore();
  };

  const onSearch = async (search: string) => {
    if (!search) {
      onClose();
      return;
    }

    await getGlobalSearch({ search });
  };

  useEffect(() => {
    onClose();
  }, [currentRoute]);

  const { cities = [], guides = [], places = [] } = global;
  const isRenderList = !!cities.length || !!guides.length || !!places.length;

  return (
    <>
      <Search
        onConfirm={onSearch}
        disabled={isLoading}
        placeholder="I'm looking for..."
        onClose={onClose}
      >
        {isRenderList && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {!!cities.length && (
              <View style={styles.item}>
                {cities.map(city => {
                  return (
                    <GlobalSearchItem
                      key={city._id}
                      image={city.image || CityPlaceholder}
                      title={city.title}
                      href={SCREENS.City}
                      hrefParams={{ city }}
                    />
                  );
                })}
              </View>
            )}
            {!!guides.length && (
              <View style={styles.item}>
                {guides.map(guide => {
                  return (
                    <GlobalSearchItem
                      key={guide._id}
                      image={guide.hImage || GuidePlaceholder}
                      title={guide.title}
                      description={guide.city.title}
                      href={SCREENS.Guide}
                      hrefParams={{ guide }}
                    />
                  );
                })}
              </View>
            )}
            {!!places.length && (
              <View style={styles.item}>
                {places.map(place => {
                  return (
                    <GlobalSearchItem
                      key={place._id}
                      image={place.images?.[0] || CityPlaceholder}
                      title={place.title}
                      description={place.city.title}
                      href={SCREENS.Place}
                      hrefParams={{ point: place }}
                    />
                  );
                })}
              </View>
            )}
          </ScrollView>
        )}
      </Search>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    gap: 10,
    paddingVertical: 3,
  },
  closeIcon: {
    position: 'absolute',
    right: 3,
    top: 3,
    zIndex: 100,
  },
});

export const GlobalSearch = observer(GlobalSearchComponent);
