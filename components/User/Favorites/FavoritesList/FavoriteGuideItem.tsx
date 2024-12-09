import React from 'react';

import { Guide, SCREENS, SOCIAL_MODELS } from '@/types';

import FavoritesListItem from '../FavoritesListItem/FavoritesListItem';

type Props = {
  guide: Guide;
  isRemoveDisabled?: boolean;
};

export const FavoriteGuideItem = ({
  guide: { slug, title, hImage, city, _id, vImage },
  isRemoveDisabled,
}: Props) => {
  return (
    <FavoritesListItem
      title={title}
      image={hImage}
      subtitle={city.title}
      slug={slug}
      modelType={SOCIAL_MODELS.Guide}
      _id={_id}
      city={city as any}
      isRemoveDisabled={isRemoveDisabled}
      href={SCREENS.Guide}
      hrefParams={
        {
          guide: {
            title,
            image: vImage,
            _id,
            slug,
            city,
          },
        } as any
      }
    />
  );
};
