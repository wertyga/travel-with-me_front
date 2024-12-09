import { Country, Guide, Place } from '@/types';

export const getFavoriteListSortedByCountry = (
  guides: Guide[],
  places: Place[]
): { country: Country; guides: Guide[]; places: Place[] }[] => {
  const markedEntities = [...guides, ...places].map((item, i) => {
    if (i < guides.length) {
      return {
        ...item,
        mark: 'guide',
      };
    }
    return {
      ...item,
      mark: 'place',
    };
  });

  const data = markedEntities.reduce((acc, entity) => {
    const guides = acc[entity.country._id]?.guides || [];
    const places = acc[entity.country._id]?.places || [];

    if (entity.mark === 'guide') {
      acc[entity.country._id] = {
        country: entity.country,
        guides: [...guides, entity],
        places,
      };
    } else {
      acc[entity.country._id] = {
        country: entity.country,
        guides,
        places: [...places, entity],
      };
    }

    return acc;
  }, {});

  return Object.values(data);
};
