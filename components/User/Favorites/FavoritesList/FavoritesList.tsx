import { ScrollView, StyleSheet } from 'react-native';

import { Guide, Place, SOCIAL_MODELS } from '@/types';

import { FavoritesListItem } from '../FavoritesListItem/FavoritesListItem';

type Props = {
  guides: Guide[];
  places: Place[];
  isRemoveDisabled?: boolean;
};

export const FavoritesList = ({ guides, places, isRemoveDisabled }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {guides.map(({ vImage, hImage, title, slug, city, _id }) => {
        return (
          <FavoritesListItem
            key={slug}
            title={title}
            image={hImage || vImage}
            subtitle={city.title}
            slug={slug}
            modelType={SOCIAL_MODELS.Guide}
            _id={_id}
            city={city as any}
            isRemoveDisabled={isRemoveDisabled}
          />
        );
      })}
      {places.map(({ images, title, slug, city, _id }) => {
        return (
          <FavoritesListItem
            key={slug}
            title={title}
            image={images[0]}
            subtitle={city.title}
            slug={slug}
            modelType={SOCIAL_MODELS.Place}
            _id={_id}
            isRemoveDisabled={isRemoveDisabled}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
