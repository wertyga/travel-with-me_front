import React from 'react';

import { Guide, Place, SCREENS, SOCIAL_MODELS } from '@/types';

import FavoritesListItem from '../FavoritesListItem/FavoritesListItem';

type Props = {
  place: Place;
  isRemoveDisabled?: boolean;
};

export const FavoritePlaceItem = ({
  place: { slug, title, city, _id, images },
  isRemoveDisabled,
}: Props) => {
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
};
