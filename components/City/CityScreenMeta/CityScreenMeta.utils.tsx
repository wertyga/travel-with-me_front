import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import flatten from 'lodash/flatten';
import { City, FONTS, Guide } from '@/types';

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

export const CITY_TABS = [
  {
    title: 'Description',
    icon: <AntDesign name="filetext1" size={18} color="white" />,
  },
  {
    title: 'History',
    icon: <SimpleLineIcons name="book-open" size={16} color="white" />,
  },
  {
    title: 'Security',
    icon: (
      <MaterialCommunityIcons
        name="shield-star-outline"
        size={20}
        color="white"
      />
    ),
  },
  {
    title: 'Transport',
    icon: <Ionicons name="bus-sharp" size={19} color="white" />,
  },
];

export const getCityMetaData = (city: City) => {
  return CITY_TABS.reduce((acc, { title, ...data }) => {
    const key = title.toLowerCase();
    if (!city[key]) return acc;

    return {
      ...acc,
      [title]: {
        ...data,
        info: city[key],
      },
    };
  }, {});
};
