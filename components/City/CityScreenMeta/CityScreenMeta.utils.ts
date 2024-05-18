import flatten from 'lodash/flatten';
import { Guide } from '@/types';

export const getGuidesCategories = (guides: Guide[]) => {
  return flatten(guides.map(({ categories }) => categories)).reduce(
    (acc, category) => {
      return {
        ...acc,
        [category]: (acc[category] || 0) + 1,
      };
    },
    {}
  );
};
