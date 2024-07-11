import { useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import { GlobalSearchItem } from '@/components/GlobalSearch/GlobalSearchItem';
import Search from '@/components/Search';
import { useStores } from '@/hooks';

import { SCREENS } from '@/types';

import CityPlaceholder from '@/assets/images/city_placeholder.png';
import GuidePlaceholder from '@/assets/images/guide_placeholder.png';

export const GlobalSearchComponent = () => {
  const [search, setSearch] = useState('');
  const { isLoading, global, dropStore, getGlobalSearch } = useStores(
    stores => ({
      global: stores.searchStore.global,
      isLoading: stores.searchStore.isLoading,
      dropStore: stores.searchStore.dropStore,
      getGlobalSearch: stores.searchStore.getGlobalSearch,
    })
  );

  const onClose = () => {
    dropStore();
    setSearch('');
  };

  const onSearch = async () => {
    if (!search) {
      onClose();
      return;
    }
    await getGlobalSearch({ search });
  };

  const { cities = [], guides = [], places = [] } = global;
  const isRenderList = !!cities.length || !!guides.length || !!places.length;

  return (
    <>
      <Search
        onSearch={onSearch}
        disabled={isLoading}
        inputProps={{
          placeholder: "I'm looking for...",
          value: search,
          onChangeText: setSearch,
        }}
      />
      {isRenderList && (
        <View style={styles.list}>
          <AntDesign
            name="close"
            size={24}
            color="black"
            style={styles.closeIcon}
            onPress={onClose}
          />
          <ScrollView contentContainerStyle={styles.listContent}>
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
                      hrefParams={{ placeSlug: place.slug }}
                    />
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  list: {
    top: 5,
    left: 0,
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    marginTop: 3,
    borderRadius: 10,
    zIndex: 2,
  },
  listContent: {
    paddingTop: 10,
    marginRight: 25,
  },
  item: {
    paddingHorizontal: 10,
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
