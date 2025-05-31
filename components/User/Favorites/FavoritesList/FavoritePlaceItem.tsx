import React from 'react';

import { Guide, Place, SCREENS, SOCIAL_MODELS } from '@/types';

import FavoritesListItem from '../FavoritesListItem/FavoritesListItem';

type Props = {
  place: Place;
  isRemoveDisabled?: boolean;
};

export const FavoritePlaceItem = ({ place, isRemoveDisabled }: Props) => {
  const { slug, title, city, _id, images } = place;
  const linkProps = {
    href: SCREENS.Place,
    hrefParams: { point: place },
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
