import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { ICONS_MAP } from '@/components/Icon/Icon';

import { SCREENS } from '@/types';

type FooterMuItemType = {
  icon: keyof typeof ICONS_MAP | React.ReactNode;
  screen: SCREENS;
  title: string;
  iconSize?: number;
};

export const FOOTER_MENU: FooterMuItemType[] = [
  {
    icon: 'city',
    screen: SCREENS.CitiesList,
    title: 'Cities',
    iconSize: 26,
  },
  {
    icon: 'heart',
    screen: SCREENS.Favorite,
    title: 'Favorite',
  },
  {
    icon: 'profile',
    screen: SCREENS.Profile,
    title: 'Account',
  },
];
