import { ScrollView, StyleSheet } from 'react-native';

import { observer } from 'mobx-react-lite';

import { Guide, Place, SCREENS, SOCIAL_MODELS } from '@/types';

import FavoritesListItem from '../FavoritesListItem/FavoritesListItem';

type Props = {
  guides: Guide[];
  places: Place[];
  isRemoveDisabled?: boolean;
};

const FavoritesList = ({ guides, places, isRemoveDisabled }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {guides.map(({ vImage, hImage, title, slug, city, _id }) => {
        return (
          <FavoritesListItem
            key={slug}
            title={title}
            image={hImage}
            subtitle={city.title}
            slug={slug}
            modelType={SOCIAL_MODELS.Guide}
            _id={_id}
            city={city as any}
            isRemoveDisabled={isRemoveDisabled}
            href={SCREENS.Guide}
            hrefParams={{
              guide: {
                title,
                image: vImage,
                _id,
                slug,
                city,
              },
            }}
          />
        );
      })}
      {places.map(({ images, title, slug, city, _id }) => {
        const linkProps = {
          href: SCREENS.Place,
          hrefParams: { placeSlug: slug },
        };
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
            {...linkProps}
          />
        );
      })}
    </ScrollView>
  );
};

export default observer(FavoritesList);

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
