import { removeElement } from 'domutils';
import flatten from 'lodash/flatten';
import { City, FONTS, Guide } from '@/types';

export const TAG_STYLES = {
  body: {
    fontFamily: FONTS.CrimsonSemiBold,
    color: 'white',
    lineHeight: 18,
  },
  li: {
    fontFamily: FONTS.CrimsonSemiBold,
    color: 'white',
    listStyleType: 'none',
  },
  h3: {
    marginBottom: 0,
    fontFamily: FONTS.OpenSansBold,
    fontSize: 16,
  },
  a: {
    fontFamily: FONTS.CrimsonBold,
    color: 'white',
  },
  p: {
    fontFamily: FONTS.CrimsonSemiBold,
    color: 'white',
    marginBottom: 0,
    marginTop: 0,
    fontSize: 14,
    lineHeight: 18,
  },
  strong: {
    fontFamily: FONTS.CrimsonBold,
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
  },
  br: {
    marginTop: 0,
    marginBottom: 0,
    height: 0,
  },
};

export const DOM_VISITORS = {
  onElement: el => {
    el.children.forEach(child => {
      if (
        child.name === 'br' &&
        child.parent.name === 'p' &&
        child.parent.children.length === 1
      ) {
        removeElement(child);
      }
    });
  },
};

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

export const CITY_TABS = ['Description', 'History', 'Security', 'Transport'];

export const getCityMetaData = (city: City) => {
  return CITY_TABS.reduce((acc, title) => {
    const key = title.toLowerCase();
    if (!city[key]) return acc;

    return {
      ...acc,
      [title]: { info: city[key] },
    };
  }, {});
};
