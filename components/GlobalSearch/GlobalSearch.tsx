import { ScrollView, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Search from '@/components/Search';
import { useLazyGlobalSearchQuery } from '@/api';

import CityPlaceholder from '@/assets/images/city_placeholder.png';
import GuidePlaceholder from '@/assets/images/guide_placeholder.png';
import { GlobalSearchItem } from '@/components/GlobalSearch/GlobalSearchItem';
import { useEffect, useState } from 'react';
import { SCREENS } from '@/types';

export const GlobalSearch = () => {
  const [state, setState] = useState({});
  const [search, setSearch] = useState('');
  const [fetchForSearch, { data, isLoading }] = useLazyGlobalSearchQuery();

  const onClose = () => {
    setState({});
    setSearch('');
  };

  const onSearch = () => {
    if (!search) {
      onClose();
      return;
    }
    fetchForSearch({ search });
  };

  useEffect(() => {
    setState(data || {});
  }, [data]);

  const { cities = [], guides = [], places = [] } = state;
  const isRenderList = !!cities.length || !!guides.length || !!places.length;

  return (
    <View style={styles.container}>
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
                      image={city.image ? { uri: city.image } : CityPlaceholder}
                      title={city.title}
                      href={SCREENS.Home}
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
                      image={
                        !!guide.hImage
                          ? { uri: guide.hImage }
                          : GuidePlaceholder
                      }
                      title={guide.title}
                      description={guide.city.title}
                      href={SCREENS.Guide}
                      hrefParams={{ guideSlug: guide.slug }}
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
                      image={
                        !!place.images?.[0]
                          ? { uri: place.images[0] }
                          : CityPlaceholder
                      }
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  list: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    marginTop: 3,
    zIndex: 20,
    borderRadius: 10,
  },
  listContent: {
    paddingTop: 10,
    marginRight: 25,
    position: 'relative',
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
