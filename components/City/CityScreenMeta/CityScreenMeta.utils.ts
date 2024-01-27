import { Guide } from '@/types';
import flatten from 'lodash/flatten';

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
