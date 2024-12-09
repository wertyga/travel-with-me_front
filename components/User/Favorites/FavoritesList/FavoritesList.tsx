import React, { useMemo } from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { CountryPill } from '@/components/Country';
import { FavoriteGuideItem } from '@/components/User/Favorites/FavoritesList/FavoriteGuideItem';
import { FavoritePlaceItem } from '@/components/User/Favorites/FavoritesList/FavoritePlaceItem';
import { getFavoriteListSortedByCountry } from '@/components/User/Favorites/FavoritesList/FavoritesList.utils';

import { Guide, Place, SCREENS, SOCIAL_MODELS } from '@/types';

import { CUSTOM_VIEW_STYLES } from '@/styles/constants';

import FavoritesListItem from '../FavoritesListItem/FavoritesListItem';

type Props = {
  guides: Guide[];
  places: Place[];
  isRemoveDisabled?: boolean;
};

const FavoritesList = ({ guides, places, isRemoveDisabled }: Props) => {
  const list = useMemo(() => {
    return getFavoriteListSortedByCountry(guides, places);
  }, [guides, places]);

  return (
    <ScrollView
      // contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {list.map(({ country, guides, places }) => {
        return (
          <View key={country._id} style={styles.container}>
            <CountryPill
              title={country.title}
              customIcon={<Text>{country.flag}</Text>}
              textable
              rectangle
            />
            {!!guides.length && (
              <View style={styles.listBlock}>
                <CText light>Guides</CText>

                {guides.map(guide => {
                  return (
                    <FavoriteGuideItem
                      key={guide._id}
                      guide={guide}
                      isRemoveDisabled={isRemoveDisabled}
                    />
                  );
                })}
              </View>
            )}
            {!!places.length && (
              <View style={styles.listBlock}>
                <CText light>Points</CText>

                {places.map(place => {
                  return (
                    <FavoritePlaceItem
                      key={place._id}
                      place={place}
                      isRemoveDisabled={isRemoveDisabled}
                    />
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default observer(FavoritesList);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  listBlock: {
    gap: 10,
    marginTop: 10,
  },
});
